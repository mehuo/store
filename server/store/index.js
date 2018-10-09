var models = require('../db');
var $sql = require('../sqlfun');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();
router.use(bodyParser.urlencoded({extended:true}))

var connection = mysql.createConnection(models.mysql);
connection.connect();
var sqls = $sql.store;

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

//添加店铺
router.post('/add', function(req, res) {
    var params = req.body;
    params.role = 1;
    params.create_time = new Date();
    params.update_time = params.create_time;
    params.is_delete = 0;
    connection.query(sqls.add , [
            params.name, //名称
            params.address, //地址
            params.create_time, //创建时间
            params.update_time, //修改时间
            params.is_delete //是否删除
        ],function (err, result) {
        if(err){
            jsonWrite(res,{status:1,statusinfo:err.message});
            return;
        }
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
    
});

module.exports = router;