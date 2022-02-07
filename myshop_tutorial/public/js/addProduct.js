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