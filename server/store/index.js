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

var pageNation = function(total,page,page_size,data){
    //total 总页数
    //page 当前页数
    //page_size 每页显示条数
    //data 数据
    console.log(total,page,page_size,data);
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
    console.log(data,key,value)
    data[key] = value;
    data['last_page'] = Math.ceil(data['total']/data['page_size']);    
    return data;
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

//编辑商铺
router.post('/edit',function(req,res){
	var params = req.body;
	let store_id =  params.id;
	connection.query(sqls.edit,[params.name,params.address,store_id],function(err,result){
		fail(err,res);
		jsonWrite(res,{status:0,statusinfo:'',data:result});
	})
})

//删除商铺
router.post('/delete',function(req,res){
	var params = req.body;
	let store_id = params.id;
	connection.query(sqls.delete,[store_id],function(err,result){
		fail(err,res);
		jsonWrite(res,{status:0,statusinfo:'',data:result})
	})
})

//获取店铺列表
router.post('/list',function(req,res){
	var params = req.body;
	var page_size = parseInt($sql.limit);
    if(params.page_size){
        page_size = parseInt(params.page_size);
    }
    var start = (parseInt(params.page)-1) * parseInt(page_size);
    var page_data = pageNation(0,parseInt(params.page),page_size,[]);
    connection.query(sqls.total , ['%'+params.keyword+'%',],function (err, result) {
        fail(err,res);
        page_data = setPageNation(page_data ,'total',result[0].total);
        connection.query(sqls.list , ['%'+params.keyword+'%',start,page_size],function (err, result) {
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

//根据id获取商铺
router.post('/getThisStore',function(req,res){
	let params = req.body;
	let store_id =  params.id;
	console.log('store_id------'+store_id)
	connection.query(sqls.getThisStore,[store_id],function(err,result){
		console.log(result);
		fail(err,res);
		jsonWrite(res,{
            status:0,
            statusinfo:'请求成功',
            data:result[0]
        });
	})
})

module.exports = router;