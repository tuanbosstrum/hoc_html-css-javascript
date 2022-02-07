let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

// xác thực người dùng
window.onload = () => {
    if (user) {
        // chuyển hướng tới trang đăng nhập khi không hợp lệ
        if (!compareToken(user.authToken, user.email)) {
            location.replace('/login');
        }
    } else {
        location.replace('/login');
    }
}

// định giá sản phẩm
const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

// giá trị sản phẩm
discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
        discountPercentage.value = 90;
    } else {
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

// sự kiện vào phần tử giá bán
sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
})

// tải ảnh sản phẩm
let uploadImage = document.querySelectorAll('.fileupload');
let imagePaths = [];