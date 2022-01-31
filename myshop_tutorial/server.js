//nhập gói
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//cài đặt tài khoản bên firebase
let serviceAccount = require("./ecom-website-5415d-firebase-adminsdk-gjxgi-b1be4d9eea.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

//thư mục công cộng
let staticPath = path.join(__dirname, 'public');

//đường dẫn máy chứa express
const app = express();

//phương pháp tạo đường dẫn tĩnh
app.use(express.static(staticPath));
app.use(express.json());

//tạo tuyến chủ để phản hồi
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//đăng ký - đăng nhập
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})

app.post('/signup', (req, res) => {
    let { name, email, password, number, tac, notification } = req.body;

    //bắt lỗi sự kiện validation
    if (name.length < 3) {
        return res.json({ 'alert': 'name must be letters long' });
    } else if (!email.length) {
        return res.json({ 'alert': 'Enter your email' });
    } else if (password.length < 8) {
        return res.json({ 'alert': 'password should be 8 letters long' });
    } else if (!number.length) {
        return res.json({ 'alert': 'enter your phone number' });
    } else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'invalid number, please enter a valid one' });
    } else if (!tac) {
        return res.json({ 'alert': 'you must agree to our terms and conditions' });
    }

    //đăng nhập user bằng firebase
    db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'email already exists' });
            } else {
                //mã hóa pass bằng thư viện bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                            .then(data => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                    seller: req.body.seller,
                                })
                            })
                    })
                })
            }
        })
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;
    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all the inputs' });
    }
    db.collection('users').doc(email).get()
        .then(user => {
            if (!user.exists) {
                return res.json({ 'alert': 'login email does not exists' })
            } else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if (result) {
                        let data = user.data();
                        return res.json({
                            name: data.name,
                            email: data.email,
                            seller: data.seller,
                        })
                    } else {
                        return res.json({ 'alert': 'password in incorrect' });
                    }
                })
            }
        })
})

//phần người bán
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let { name, about, address, number, tac, legit, email } = req.body;
    if (!name.length || !address.length || !about.length || number.length < 10 || !Number(number)) {
        return res.json({ 'alert': 'some infomation(s) is/are invalid' });
    } else if (!tac || !legit) {
        return res.json({ 'alert': 'you must agree to our terms and conditions' })
    } else {
        //update user seller status
        db.collection('sellers').doc(email).set(req.body)
            .then(data => {
                db.collection('users').doc(email).update({
                    seller: true
                }).then(data => {
                    res.json(true);
                })
            })
    }
})

//bắt lỗi trang web 404 not found)
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(3000, () => {
    constructor('listening on port 3000...');
})