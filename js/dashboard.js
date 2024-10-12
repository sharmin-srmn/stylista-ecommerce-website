let user = JSON.parse(sessionStorage.user || null);
const loader = document.querySelector('.loader');
let logo = document.querySelector('.logo');
if(user == null){
    loader.style.display = 'block';
    location.replace('/login');
}else if(!user.seller){
    loader.style.display = 'block';
    location.replace('/seller');
}
let greeting = document.querySelector('#user-name');
greeting.innerHTML = user.name;
//go back to home page
logo.addEventListener('click', () =>{
    location.replace('/');
})

//add product button
let addProduct = document.querySelector('.add-product-btn');
addProduct.addEventListener('click', () =>{
    loader.style.display = 'block';
    location.replace('/add-product');
})
// //edit product button
// let editProduct = document.querySelector('.edit-product-btn');
// editProduct.addEventListener('click', () =>{
//     loader.style.display = 'block';
//     location.replace('/editProduct');
// })
// //delete product button
// let deleteProduct = document.querySelector('.delete-product-btn');
// deleteProduct.addEventListener('click', () =>{
//     loader.style.display = 'block';
//     location.replace('/deleteProduct');
// })
//all products button
let allProducts = document.querySelector('.all-products-btn');
allProducts.addEventListener('click', () =>{
    loader.style.display = 'block';
    location.replace('/allProducts');
})