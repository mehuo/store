var models = require('../db');
var $sql = require('../sqlfun');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();
router.use(bodyParser.urlencoded({extended:true}))

var connection = mysql.createConnection(models.mysql);
connection.connect();
var sqls = $sql.util;


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
    console.log(page_data)
    return page_data;
}

var setPageNation = function(data ,key , value){
    data[key] = value;
    data['last_page'] = Math.ceil(data['total']/data['page_size']);    
    return data;
}



//获取地址
router.post('/getArea', function(req, res) {
    var params = req.body;
    if(params.type){
        let sql = sqls[params.type];
        let sqlArray = [];
        if(params.type != 'province'){
            sqlArray = [params.code]
        }
        connection.query(sql , sqlArray, function (err, result) {
            fail(err,res);
            jsonWrite(res,{status:0,statusinfo:result.message,data:result});
            res.end();
        });  
    }else{
        jsonWrite(res);
    }
});

module.exports = router;