const loader = document.querySelector('.loader');

//thêm sự kiện khi tải vào cửa sổ

window.onload = () => {
    if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if (compareToken(user.authToken, user.email)) {
            location.replace('/');
        }
    }
}

// select input
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const notification = document.querySelector('#notification');

submitBtn.addEventListener('click', () => {
    if (name.value.length < 3) {
        showAlert('name must be 3 letters long');
    } else if (!email.value.length) {
        showAlert('Enter your email');
    } else if (password.value.length < 8) {
        showAlert('password should be 8 letters long');
    } else if (!number.value.length) {
        showAlert('enter your phone number');
    } else if (!Number(number.value) || number.value.length < 10) {
        showAlert('invalid number, please enter a valid one');
    } else if (!tac.checked) {
        showAlert('you must agree to our terms and conditions');
    } else {
        //chạy
        loader.style.display = 'block';
        sendData('/signup', {
            name: name.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked,
            notification: notification.checked,
            seller: false
        })
    }
})

//tạo kiểu chức năng
const sendData = (path, data) => {
    fetch(path, {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        }).then((res) => res.json())
        .then(response => {
            processData(response);
        })
}

//kiểm tra dữ liệu đã có hay chưa
const processData = (data) => {
    loader.style.display = null;
    if (data.alert) {
        showAlert(data.alert);
    } else if (data.name) {
        //làm tokens
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');
    }
}

// lệnh cảnh báo
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}