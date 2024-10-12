let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');
let logo = document.querySelector('.logo');

//checking user is logged in or not
window.on = ()=> {
    if (user){
        if(!comapreToken(user.authToken, user.email)){
            location.replace('/login');
        }        
    }else{
        location.replace('/login')
    }
}
//go back to home page
logo.addEventListener('click', () =>{
    location.replace('/');
})
// all input
const actualprice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');
const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');
let sizes = [];
//calculation of selling price
discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100){
        discountPercentage.value =90;
    }else{
        let discount = actualprice.value * discountPercentage.value /100;
        sellingPrice.value = actualprice.value- discount;
    }
})
//calculation of discounted percentage
sellingPrice.addEventListener('input', () =>{
    let discount = (sellingPrice.value/ actualprice.value) *100;
    discountPercentage.value = discount;
})
// upload image handle
let uploadImage = document.querySelector('.fileupload');
let imagePaths = []; // will store all uploaded images paths
//go back to dashboard
let goBackDashboard = document.querySelector('.left-arrow');
goBackDashboard.addEventListener('click', () =>{
    loader.style.display = 'block';
    setTimeout(() => {
        location.replace('/dashboard');
    },300)    
})

//store sizes function
const storeSizes = () => {
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if(item.checked){
            sizes.push(item.value);
        }
    })
}
// validate products details
const validateForm = () => {
    if(!productName.value.length){
       return showAlert('enter product name');
    }else if(shortLine.value.length >100 || shortLine.value.length < 10  ){
       return showAlert('enter short description must be between 10 to 100 letters');
    }else if (!des.value.length){
       return showAlert('enter detail descrition about the product');
    }else if(!sizes.length){
        return showAlert('select atleast one size');
    }else if(!actualprice.value.length || !discount.value.length || !sellingPrice.value.length ){
        return showAlert('you must add pricings');
    }else if(stock.value < 5){
        return showAlert('you should have at least 5 items in stock')
    }else if(!tags.value.length){
        return showAlert('enter few tags to help ranking your product in search')
    }else if(!tac.checked){
        return showAlert('you must agree to our terms and conditions');
    }
    return true;
}
//
const productData = () => {
    return data = {
        name : productName.value,
        shortDes : shortLine.value,
        des : des.value,
        sizes : sizes,
        actualprice : actualprice.value,
        discountPrice : discountPercentage.value,
        sellPrice : sellingPrice.value,
        stock : stock.value,
        tags : tags.value,
        tac : tac.checked,
        email : user.email
    }
} 

// adding product
addProductBtn.addEventListener('click' , () => {
    storeSizes();
    if(validateForm()){
        loader.style.display = 'block' ;
        let data = productData();
        // console.log(data);
        sendData('/add-product', data); 
    }
})

saveDraft.addEventListener('click', () =>{
    // alert('draft');
    storeSizes();
    if(!productName.value.length){
        showAlert('enter product name');
    }else{
        let data = productData();
        data.draft = true;
        sendData('/add-product',data);
    }
})




