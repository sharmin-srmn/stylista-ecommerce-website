let logo = document.querySelector('.logo');
let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);

//go back to home page
logo.addEventListener('click', () =>{
    location.replace('/');
})


//go back to dashboard
let goBackDashboard = document.querySelector('.left-arrow');
goBackDashboard.addEventListener('click', () =>{
    loader.style.display = 'block';
    setTimeout(() => {
        location.replace('/dashboard');
    },300)    
})

// setUpProducts 
const setUpProducts = () => {
    fetch('/get-products', {
        method : 'post',
        headers : new Headers({"Content-Type" : "application/json"}),
        body : JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        //  console.log(data)})
        loader.style.display = null;
        // productListingElement.classList.remove('hide');
        if(data == 'no products'){
            let emptySvg = document.querySelector('no-product-image');
            emptySvg.classList.remove('hide');
        }else{
            data.forEach(product => createProduct(product));
        }
    })
}

window.onload = () => {
        if(user){
            if(compareToken(user.authToken, user.email)){
                if(!user.seller){
                    becomeSellerElement.classList.remove('hide');
                }
                else{               
                    loader.style.display= "block";
                    setUpProducts();
                }
            }
            else{
                location.replace('/login');
            }
        }else{
            location.replace('/login');
        }
}

let productId = null;
console.log(location.pathname);




