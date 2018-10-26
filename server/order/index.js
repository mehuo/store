var models = require('../db');
var $sql = require('../sqlfun');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var async = require('async');
var router = express.Router();
router.use(bodyParser.urlencoded({extended:true}))

var connection = mysql.createConnection(models.mysql);
connection.connect();
var sqls = $sql.order;

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined' || ret.status == 1) {
        res.json({
            status: '1',
            statusinfo: ret.statusinfo || '操作失败',
            data: ret.data || {}
        });
    } else {
        res.json(ret);
    }
};

var fail = function(err,res){
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        jsonWrite(res,{status:1,statusinfo:err.message});
        return;
    }
}

var pageNation = function(total,page,page_size,data){
    //total 总页数
    //page 当前页数
    //page_size 每页显示条数
    //data 数据
    // console.log(total,page,page_size,data);
    var page_data = {};
    page_data.total = total || 0;
    page_data.page = page || 1;
    page_data.page_size = page_size || parseInt($sql.limit);
    page_data.last_page = Math.ceil(total/page_size);
    if(data){
        page_data.data = data;
    }else{
        page_data.data = [];
    }
    // console.log(page_data)
    return page_data;
}

var setPageNation = function(data ,key , value){
    // console.log(data,key,value)
    data[key] = value;
    data['last_page'] = Math.ceil(data['total']/data['page_size']);    
    return data;
}


//添加订单
router.post('/add', function(req, res) {
    var params = req.body;
    connection.query(sqls.add , [
        params.user_id, //用户id
        params.totalPrice, //订单价格
        params.status, //订单状态
    ],
    function (err, result) {
        fail(err,res);
        async.map(params.productList, function(item, callback) {
            let sql = sqls.productAdd;
            console.log(item);
            console.log(result.insertId);
            let paramsInfo = [
                result.insertId,
                params.user_id,
                item.product_id,
                item.name,
                item.price,
                item.quantity,
                item.select_size,
                item.select_type,
                params.status
            ]
            connection.query(sql,paramsInfo, function(err,result1){
                callback(null, item);
            });
        }, function(err,results) {
            console.log(results);
        });

        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
});

module.exports = router;
