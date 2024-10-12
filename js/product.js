const productImages = document.querySelectorAll(".product-images > img");
const productImageSlide = document.querySelector(".image-slider");
let loader = document.querySelector('.loader');
let activeImageSlide = 0;
productImages.forEach((item,i)=>{
    item.addEventListener('click', ()=> {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i;
    })
})

//toggle size button
const sizeBtns = document.querySelectorAll(".size-radio-btn");
let checkedBtn = 0;
sizeBtns.forEach((item, i) => {
    item.addEventListener('click',() => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
    })
})

const addCartBtn = document.querySelector('.cart-btn');
addCartBtn.addEventListener('click', ()=> {
            location.replace('/cart');
})

    


    


