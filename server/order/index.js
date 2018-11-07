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

var _shuffUUID = function(){
    //生成32位随机数
    var dict = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    var num = dict.length;
    var uuid = "";
    var sum = 0;
    for (var i = 0; i < 31; i++) {
        var idx = Math.floor(Math.random() * num);
        var ch = dict[idx];
        sum += ch.charCodeAt(0);
        uuid += ch;
    }
    //生成校验位
    uuid += String.fromCharCode((sum % 26 + 97));
    return uuid;
}


//添加订单
router.post('/add', function(req, res) {
    var params = req.body;
    connection.query(sqls.add , [
        params.user_id, //用户id
        params.address_id, //地址ID
        params.delivery_id, //配送方式
        _shuffUUID(),//订单编号
        params.totalPrice, //订单价格
        params.status, //订单状态
    ],
    function (err, result) {
        fail(err,res);
        async.map(params.productList, function(item, callback) {
            let sql = sqls.productAdd;
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
            let delete_sql = $sql.product.delCart;
            connection.query(sql,paramsInfo, function(err,result1){
                connection.query(delete_sql,[item.id,params.user_id],function(err,result2){
                    callback(null, item);
                })
            });
        }, function(err,results) {
            console.log(results);
        });
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
});

//查看订单中的产品
router.post('/getProducts',function(req,res){
    var params = req.body;
    console.log(params)
    connection.query(sqls.getProducts,[params.order_id,params.user_id],function(err,result){
        fail(err,res);
        console.log(result);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    })
});

//获取订单详情
router.post('/getInfo',function(req,res){
    var params = req.body;
    connection.query(sqls.getInfo,[params.order_id,params.user_id],function(err,result){
        fail(err,res);
        console.log(result);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result[0]});
        res.end();
    })
});

//获取订单列表
router.post('/list',function(req,res){
    var params = req.body;
    var page_size = parseInt($sql.limit);
    if(params.page_size){
        page_size = parseInt(params.page_size);
    }
    var start = (parseInt(params.page)-1) * parseInt(page_size);
    var page_data = pageNation(0,parseInt(params.page),page_size,[]);
    let totalParams = [
        params.user_id,
        params.order_status
    ]
    let listParams = [
        params.user_id,
        params.order_status,
        start,
        page_size
    ]
    connection.query(sqls.total ,totalParams,function (err, result) {
        fail(err,res);
        page_data = setPageNation(page_data ,'total',result[0].total);
        connection.query(sqls.list , listParams,function (err, result) {
            fail(err);
            page_data = setPageNation(page_data ,'data' , result);
            jsonWrite(res,{
                status:0,
                statusinfo:'',
                data:page_data
            });
            res.end();
        });
    });  
})



module.exports = router;
