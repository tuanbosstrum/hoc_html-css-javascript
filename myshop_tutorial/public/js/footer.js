const createFooter = () => {
    let footer = document.querySelector('footer');
    footer.innerHTML = `
    <div class="footer-content">
    <img src="img/light-logo.png" class="logo" alt="">
    <div class="footer-ul-container">
        <ul class="category">
            <li class="category-title">men</li>
            <li>
                <a href="#" class="footer-link">t-shirts</a>
            </li>
            <li>
                <a href="#" class="footer-link">sweatshirts</a>
            </li>
            <li>
                <a href="#" class="footer-link">shirts</a>
            </li>
            <li>
                <a href="#" class="footer-link">jeans</a>
            </li>
            <li>
                <a href="#" class="footer-link">shoes</a>
            </li>
            <li>
                <a href="#" class="footer-link">formals</a>
            </li>
            <li>
                <a href="#" class="footer-link">sports</a>
            </li>
            <li>
                <a href="#" class="footer-link">watchs</a>
            </li>
        </ul>
        <ul class="category">
            <li class="category-title">women</li>
            <li>
                <a href="#" class="footer-link">t-shirts</a>
            </li>
            <li>
                <a href="#" class="footer-link">sweatshirts</a>
            </li>
            <li>
                <a href="#" class="footer-link">shirts</a>
            </li>
            <li>
                <a href="#" class="footer-link">jeans</a>
            </li>
            <li>
                <a href="#" class="footer-link">shoes</a>
            </li>
            <li>
                <a href="#" class="footer-link">formals</a>
            </li>
            <li>
                <a href="#" class="footer-link">sports</a>
            </li>
            <li>
                <a href="#" class="footer-link">watchs</a>
            </li>
        </ul>
    </div>
</div>
<p class="footer-title">about company</p>
<p class="info">Clothing shop</p>
<p class="info">emails - tuanbosstrum@gmail.com, tuanbosstrum1@gmail.com</p>
<p class="info">telephone - 0946535271</p>
<div class="footer-social-container">
    <div>
        <a href="#" class="social-link">terms & sevices</a>
        <a href="#" class="social-link">privacy page</a>
    </div>
    <div>
        <a href="#" class="social-link">instagram</a>
        <a href="#" class="social-link">facebook</a>
        <a href="#" class="social-link">twister</a>
    </div>
</div>
<p class="footer-credit">Clothing, best apparels online shop... </p>
    `;
}

createFooter();