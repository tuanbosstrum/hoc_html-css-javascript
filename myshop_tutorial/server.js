//nhập gói
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

//thư mục công cộng
let staticPath = path.join(__dirname, 'public');

//đường dẫn máy chứa express
const app = express();

//phương pháp tạo đường dẫn tĩnh
app.use(express.static(staticPath));

//tạo tuyến chủ để phản hồi
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

//đăng ký - đăng nhập
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
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