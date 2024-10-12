let loader = document.querySelector('.loader');
let logo = document.querySelector('.logo');
//go back to dashboard
let goBackDashboard = document.querySelector('.left-arrow');
goBackDashboard.addEventListener('click', () =>{
    loader.style.display = 'block';
    setTimeout(() => {
        location.replace('/dashboard');
    },300)
})
//go back to home page
logo.addEventListener('click', () =>{
    location.replace('/');
})