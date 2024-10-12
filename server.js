const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
//firebase admin setup
let serviceAccount = require("./eco-web-8606f-firebase-adminsdk-1cw39-5aea5186bc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

let staticPath = path.join(__dirname, );

const app = express();

app.use(express.static(staticPath));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//signup route
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    //form validations
    if(name.length <3){
        return res.json({'alert': 'name must be 3 letters long'});
    }
    else if(!email.length){
        return res.json({'alert': 'enter your email'});
    }
    else if(password.length < 8){
        return res.json({'alert': 'password should be 8 letters long'});
    }
    else if(!number.length){
        return res.json({'alert': 'enter your phone number'});
    }
    else if(!Number(number) || number.length < 11){
        return res.json({'alert': 'invalid number, please enter valid one'});
    }
    else if(!tac){
        return res.json({'alert': 'you must agree to our terms and conditions'});
    }
    
    //store user in db
    db.collection('users').doc(email).get()
    .then(user => {
        if(user.exists){
            return res.json({'alert': 'email already exists'});
        }
        else{
            // encrypt the password before storing it.
            bcrypt.genSalt(10,(err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
                    db.collection('users').doc(email).set(req.body)
                    .then(data => {
                        res.json({
                            name: req.body.name,
                            email: req.body.email,
                            seller: req.body.seller,
                        })
                    })
                })
            })
        }
    })
})

//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert': 'fill all the inputs'})
    }

    db.collection('users').doc(email).get()
    .then(user => {
        if(!user.exists){ // if email does not exists
            return res.json({'alert': 'log in email does not exists'})
        }
        else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller,
                    })
                }
                else{
                    return res.json({'alert': 'password is incorrect'});
                }
            })
        }
    })
})

//seller route
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let {name, about, address, number, tac, legit, email } = req.body;
    if(!name.length || !address.length || !about.length || number.length < 11 || !Number(number)){
        return res.json({'alert':'some information(s) is/are invalid'});
    }
    else if(!tac || !legit){
        return res.json({'alert':'you must agree to our terms and conditions'});
    }
    else{
        //update users seller status here.
        db.collection('sellers').doc(email).set(req.body)
        .then(data => {
            db.collection('users').doc(email).update({
                seller: true
            }).then(data => {
                res.json(true);
            })
        })
    }
})
//single Product
app.get('/product', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"))
})
//add Product
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
})
//editProduct
app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
})


// add product route
app.post('/add-product' ,(req, res) =>{
    let { name, shortDes, des, sizes, actualprice, discountPrice , sellPrice, stock, tags, tac, draft} = req.body;

    if(!draft){
            //validation
        if(!name.length){
            return res.json({'alert' : 'enter product name'});
        }else if(shortDes.length >100 || shortDes.length < 10  ){
            return res.json({'alert' :'enter short description must be between 10 to 100 letters'});
        }else if (!des.length){
            return res.json({'alert' :'enter detail descrition about the product'});
        }else if(!sizes.length){
            return res.json({'alert' :'select atleast one size'});
        }else if(!actualprice.length || !discountPrice.length || !sellPrice.length ){
            return res.json({'alert' :'you must add pricings'});
        }else if(stock < 5){
            return res.json({'alert' :'you should have at least 5 items in stock'})
        }else if(!tags.length){
            return res.json({'alert' :'enter few tags to help ranking your product in search'})
        }else if(!tac){
            return res.json({'alert' :'you must agree to our terms and conditions'});
        }
    }

    

    //add product
    let docName = `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}`;
    db.collection('products').doc(docName).set(req.body)
    .then(data =>{
        res.json({'product' : name});
    })
    .catch(err =>{
        return res.json({'alert' : 'some error occured. Try again'})
    })

})
// //edit Product
// app.get('/editProduct', (req, res) => {
//     res.sendFile(path.join(staticPath, "editProduct.html"))
// })
// //delete Product
// app.get('/deleteProduct', (req, res) => {
//     res.sendFile(path.join(staticPath, "deleteProduct.html"))
// })
//all Products
app.get('/allProducts', (req, res) => {
    res.sendFile(path.join(staticPath, "allProducts.html"))
})
// dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(staticPath, "dashboard.html"))
})
//cart page
app.get('/cart', (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"))
})
//checkout page
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(staticPath, "checkout.html"))
})
//get products
app.post('/get-products', (req, res) => {
    let { email} = req.body;
    let docRef = db.collection('products').where('email' , '==', email);

    docRef.get()
    .then(products => {
        if (products.empty){
            return res.json('no products');
        }
        let productArr = [];
        products.forEach(item => {
            let data = item.data();
            data.id = item.id;
            productArr.push(data);
        })
        res.json(productArr)
    })
})

//bujhi nai
//delete product
app.post('/delete-product', (req,res) =>{
    let { id } = req.body; 
    db.collection('products').doc(id).delete()
    // deleteDoc(doc(collection(db, "products"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

//404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.get((req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(3000, () => {
    console.log('Listening on port 3000.......');
})
