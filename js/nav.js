const createNav = () => {
    let nav =document.querySelector('.navbar');

    nav.innerHTML = `
    <div class="nav">
            <img src="img/dark-logo.png" class="brand-logo" alt="">
                <div class="nav-items">
                    <div class="search">
                        <input type="text" class="search-box" placeholder="search brand, product">
                            <button class="search-btn">search</button>
                        </input></div>
                    <a href="#">
                        <img src="img/user.png" id="user-img" alt="">
                        <div class ="login-logout-popup hide">
                            <p class="account-info"> Logged in as, name</p>
                            <button class="btn" id="seller-account-btn">Create Seller Account</button>
                            <button class="btn" id="dashboard-btn">dashboard</button>
                            <button class="btn" id="user-btn">Log out</button>
                        </div>
                    </a>
                    <a href="#"><img src="img/cart.png" class="cart-image" alt=""></img></a>
                </div>
            </img></div><ul class="links-container">
                <li class="link-item"><a href="#" class="link home-link">home</a></li>
                <li class="link-item"><a href="#" class="link">men</a></li>
                <li class="link-item"><a href="#" class="link">women</a></li>
                <li class="link-item"><a href="#" class="link">kids</a></li>
                <li class="link-item"><a href="#" class="link">accessories</a></li>
            </ul>
    `;
}
createNav ();

//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const createSellerBtn = document.querySelector('#seller-account-btn');
const dashboardBtn = document.querySelector('#dashboard-btn');
const actionBtn = document.querySelector('#user-btn');
const cartBtn = document.querySelector('.cart-image');
const logo = document.querySelector('.brand-logo');
const homeLink = document.querySelector('.home-link');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null){
        //means user is logged in
        popuptext.innerHTML = `logged in as, ${user.name}`;
        if(!user.seller){
            createSellerBtn.innerHTML = `create seller account`; 
            dashboardBtn.style.display = 'none';
        }else{
            dashboardBtn.innerHTML = `dashboard`;
            createSellerBtn.style.display = 'none';
        }
        actionBtn.innerHTML = 'log out';
        createSellerBtn.addEventListener('click', () => {
            location.replace('/seller');
        })
        dashboardBtn.addEventListener('click', () => {
            location.replace('/dashboard');
        })
        cartBtn.addEventListener('click', () =>{
            location.replace('/cart')
        })
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    }
    else{
        //user is logged out
        popuptext.innerHTML = 'log in to place order';
        createSellerBtn.style.display = 'none';
        dashboardBtn.style.display = 'none';
        actionBtn.innerHTML = 'log in';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
        cartBtn.addEventListener('click', () =>{
            location.replace('/login')
        })
    }
}

//redirect cart page
logo.addEventListener('click', () => {
    location.replace('/');
})
homeLink.addEventListener('click', () => {
    location.replace('/');
})