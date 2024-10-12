const createFooter = () =>{
let footer = document.querySelector('footer');
footer.innerHTML=`
<div class="footer-content">
        <img  src="img/light-logo.png"class="logo" alt="">
        <div class="footer-ul-container">
            <ul class="category">
                <li class="category-title">men</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">panjabi</a></li>
                <li><a href="#" class="footer-link">shirts</a></li>
                <li><a href="#" class="footer-link">jeans</a></li>
                <li><a href="#" class="footer-link">trousers</a></li>
                <li><a href="#" class="footer-link">shoes</a></li>
                <li><a href="#" class="footer-link">casuals</a></li>
                <li><a href="#" class="footer-link">formals</a></li>
                <li><a href="#" class="footer-link">sports</a></li>
                <li><a href="#" class="footer-link">watch</a></li>
                </ul>
            <ul class="category">
                <li class="category-title">women</li>
                <li><a href="#" class="footer-link">kurti</a></li>
                <li><a href="#" class="footer-link">lehenga</a></li>
                <li><a href="#" class="footer-link">shirts</a></li>
                <li><a href="#" class="footer-link">jeans</a></li>
                <li><a href="#" class="footer-link">tops</a></li>
                <li><a href="#" class="footer-link">shoes</a></li>
                <li><a href="#" class="footer-link">saree</a></li>
                <li><a href="#" class="footer-link">western</a></li>
                <li><a href="#" class="footer-link">salwar kameez</a></li>
                <li><a href="#" class="footer-link">watch</a></li>
            </ul>
        </div>
    </div>
    <p class="footer-title">about </p>
    <p class="info">Experience Personalized Online Shopping in Bangladesh with styleista.com.bd
        Online Shopping BD has never been easier. styleista.com.bd is best online shopping
        store in Bangladesh that features 1lakh products at affordable prices.
        As bangaldesh's online shopping landscape is expanding every year, online shopping in dhaka, 
        chittagong, khulna, sylhet and other big cities are also gaining momentum. 
        styleista is among best websites for online shopping in bangladesh that promises fast, 
        reliable and convenient delivery of products to your doorstep. styleista being the trusted 
        online shop in Bangladesh aims to provide a trouble-free shopping experience for the people
        of Bangladesh but is also providing ample opportunity for international online shopping from
        Bangladesh. styleista aims to make online shopping accessible to all parts of the country.
        Everyone is encouraged to shop with confidence at styleista.com.bd as our strict buyers protection 
        policies ensure no risks while shopping online.</p>
        <p class="info">support emails - help@styleista.com
            customersupport@styleista.com</p>
            <p  class="info">contact - 01314684028,01879402884 </p>
            <div class="footer-social-container">
                <div>
                    <a href="#" class="social-link"> terms & services</a>
                    <a href="#" class="social-link"> privacy page</a>

                </div>
                <div>
                    <a href="#" class="social-link"> instragram</a>
                    <a href="#" class="social-link"> facebooks</a>
                    <a href="#" class="social-link"> twitter</a>
                </div>
            </div>
            <p class="footer-credit">styleista,best apprels online store</p>
`;
}

createFooter();

let footerLogo = document.querySelector('.logo');
footerLogo.addEventListener('click', () =>{
    location.replace('/')
})
