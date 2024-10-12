const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) =>{
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nxtBtn[i].addEventListener('click', () =>{
        item.scrollLeft += containerWidth;
    })
    preBtn[i].addEventListener('click', () =>{
        item.scrollLeft -= containerWidth;
    })
})

// product card 
let firstCard = document.querySelector('.first');
firstCard.addEventListener('click', () =>{
    location.replace('/product')
})
let secondCard = document.querySelector('.second');
secondCard.addEventListener('click', () =>{
    location.replace('/product')
})
let thirdCard = document.querySelector('.third');
thirdCard.addEventListener('click', () =>{
    location.replace('/product')
})
let fourthCard = document.querySelector('.fourth');
fourthCard.addEventListener('click', () =>{
    location.replace('/product')
})