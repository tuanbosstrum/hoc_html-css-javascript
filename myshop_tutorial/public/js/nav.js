const createNav = () => {
    let nav = document.querySelector('.navbar');
    nav.innerHTML = `
        <div class="nav">
            <img src="img/dark-logo.png" class="brand-logo" alt="" />
            <div class="nav-items">
                <!-- tìm kiếm -->
                <div class="search">
                    <input type="text" class="search-box" placeholder="search brand, product" />
                    <button class="search-btn">search</button>
                    <a>
                        <img src="img/user.png" id="user-img" alt="" />
                        <div class="login-logout-popup hide">
                            <p class="account-info">Login as, name</p>
                            <button class="btn" id="user-btn">logout.</button>
                        </div>
                    </a>
                    <a href="#"><img src="img/cart.png" alt="" /></a>
                </div>
            </div>
        </div>
        <ul class="links-container">
            <li class="link-item">
                <a href="#" class="link">home</a>
            </li>
            <li class="link-item">
                <a href="#" class="link">men</a>
            </li>
            <li class="link-item">
                <a href="#" class="link">women</a>
            </li>
            <li class="link-item">
                <a href="#" class="link">kids</a>
            </li>
            <li class="link-item">
                <a href="#" class="link">accessories</a>
            </li>
        </ul>
    `;
}
createNav();
//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

// event ẩn hiện click icon user
userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

//sự kiện loggin logout_token
window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    //phiên truy cập
    if (user != null) {
        //đăng nhập
        popuptext.innerHTML = `login as, ${user.name}`;
        actionBtn.innerHTML = 'logout';
        actionBtn.addEventListener('click', () => {
            sessionStorage.clear();
            location.reload();
        })
    } else {
        //đăng xuất
        popuptext.innerHTML = 'login to place order';
        actionBtn.innerHTML = 'Login';
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}