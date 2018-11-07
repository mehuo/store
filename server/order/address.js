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
var sqls = $sql.address;

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


//添加
router.post('/add', function(req, res) {
    var params = req.body;
    params.role = 1;
    params.create_time = new Date();
    params.update_time = params.create_time;
    params.is_delete = 0;
    connection.query(sqls.add , [
            params.user_id, //用户id
            params.address, //地址
            params.name, //收货人姓名
            params.phone, //收货人手机号
            0, //是否默认
            0 //是否删除
        ],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
});

//编辑
router.post('/edit', function(req, res) {
    var params = req.body;
    connection.query(sqls.edit , [
            params.address, //地址
            params.name, //收货人姓名
            params.phone, //收货人手机号
            params.user_id, //用户id
            params.id, //记录id
        ],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
});

//获取列表
router.post('/list',function(req,res){
    var params = req.body;
    connection.query(sqls.list , [ params.user_id ],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
})

//设置默认值
router.post('/setDefault',function(req,res){
    var params = req.body;
    connection.query(sqls.clearDefault,[params.user_id],function(err,result){
        async.series([
            function(callback){
                connection.query(sqls.setDefault , [ params.user_id,params.id ],function (err, result) {
                    callback(err,result);
                });
            }
        ],function(err,result){
            fail(err,res);
            jsonWrite(res,{status:0,statusinfo:result.message,data:result});
            res.end();
        })
    })
})

//删除
router.post('/delete',function(req,res){
    var params = req.body;
    connection.query(sqls.delete , [ params.user_id,params.id ],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
})

//获取配送信息列表
router.post('/getDelivery',function(req,res){
    var params = req.body;
    connection.query(sqls.getDelivery ,function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
})

//根据id获取地址详情
router.post('/getAddressInfo',function(req,res){
    var params = req.body;
    connection.query(sqls.getAddressInfo,[params.id],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result[0]});
        res.end();
    });
})

//根据id获取配送方式详情
router.post('/getDeliveryInfo',function(req,res){
    var params = req.body;
    connection.query(sqls.getDeliveryInfo,[params.id],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result[0]});
        res.end();
    });
})





module.exports = router;
