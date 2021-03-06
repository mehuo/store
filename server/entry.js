var adminApi = require('./system/admin');
var userApi = require('./system/user');
var productApi = require('./product/index');
var storeApi = require('./store/index');
var orderApi = require('./order/index');
var addressApi = require('./order/address');
var utilApi = require('./utils/index');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
const app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.join(__dirname, '../src')));

// 后端api路由
app.use('/util', utilApi);
app.use('/admin', adminApi);
app.use('/system/user', userApi);
app.use('/product', productApi);
app.use('/store', storeApi);
app.use('/order', orderApi);
app.use('/address', addressApi);

// 监听端口
app.listen(8888);
console.log('success listen at port:8888......');