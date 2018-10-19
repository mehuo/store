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
var sqls = $sql.product;

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


//添加产品
router.post('/add', function(req, res) {
    var params = req.body;
    params.role = 1;
    params.create_time = new Date();
    params.update_time = params.create_time;
    params.is_delete = 0;
    connection.query(sqls.add , [
            params.name, //名称
            params.shop_id, //所属店铺
            params.price, //价格
            params.size_detail, //商品尺码
            params.type_detail, //商品种类
            params.part_ids, //附加产品ids
            params.images, //商品图片
            params.content, //商品详情
            params.key_words, //商品关键字
            params.create_time, //创建时间
            params.update_time, //修改时间
            params.is_delete //是否删除
        ],function (err, result) {
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:result.message,data:result});
        res.end();
    });
});

//编辑商品
router.post('/edit',function(req,res){
    var params = req.body;
    let id =  params.id;
    connection.query(sqls.edit, [
            params.name, //名称
            params.price, //价格
            params.size_detail, //商品尺码
            params.type_detail, //商品种类
            params.part_ids, //附加产品ids
            params.images, //商品图片
            params.content, //商品详情
            params.key_words, //商品关键字
            params.update_time, //修改时间
            id
        ],function(err,result){
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:'',data:result});
    })
})



//删除产品
router.post('/delete',function(req,res){
    var params = req.body;
    let prod_id = params.id;
    connection.query(sqls.delete,[prod_id],function(err,result){
        fail(err,res);
        jsonWrite(res,{status:0,statusinfo:'',data:result})
    })
})

//获取产品列表
// shop_id 商品id 不存在是即查询所有商铺下商品
// keyword 查询关键字
// page_size 每页显示条数
// page 当前页数
router.post('/list',function(req,res){
    var params = req.body;
    var page_size = parseInt($sql.limit);
    if(params.page_size){
        page_size = parseInt(params.page_size);
    }
    var start = (parseInt(params.page)-1) * parseInt(page_size);
    var page_data = pageNation(0,parseInt(params.page),page_size,[]);

    var shop_id;
    let total_sql;
    let total_arr;
    let list_sql;
    let list_arr;
    if(params.shop_id){
        shop_id = params.shop_id;
        total_sql = sqls.totalByShop;
        total_arr = [shop_id,'%'+params.keyword+'%'];
        list_sql = sqls.listByShop;
        list_arr = [shop_id,'%'+params.keyword+'%',start,page_size] 
    }else{
        total_sql = sqls.total;
        total_arr = ['%'+params.keyword+'%'];
        list_sql = sqls.list;
        list_arr = ['%'+params.keyword+'%',start,page_size] 
    }
    connection.query(total_sql , total_arr ,function (err, result) {
        fail(err,res);
        page_data = setPageNation(page_data ,'total',result[0].total);
        connection.query(list_sql , list_arr ,function (err, result) {
            fail(err);
            let resultData = result;
            for (var i = 0; i < resultData.length; i++) {
                resultData[i].partProduct = [];
                if(resultData[i].part_ids){
                    let part_ids = JSON.parse(resultData[i].part_ids);
                    for (var j = 0; j < part_ids.length; j++) {
                        connection.query(sqls.getThis,[part_ids[j]],function(err1,result1){
                            console.log(result1);
                            if(resultData[i] && resultData[i].partProduct){
                                resultData[i].partProduct.push(result1[0]);
                            }
                        })
                    }
                }
            }
            fail(err);
            page_data = setPageNation(page_data ,'data' , resultData);
            jsonWrite(res,{
                status:0,
                statusinfo:'',
                data:page_data
            });
            res.end();
        });
    });  
})

//获取该商铺下所有商品不分页
// 参数 
// shop_id 商品id 不存在是即查询所有商铺下商品
// keyword 查询关键字
router.post('/allBy',function(req,res){
    var params = req.body;
    let shop_id;
    let list_sql;
    let params_arr;
    if(params.shop_id){
        shop_id = params.shop_id;
        list_sql = sqls.allByShopId;
        params_arr = [shop_id,'%'+params.keyword+'%'];
    }else{
        list_sql = sqls.allBySearch;
        params_arr = ['%'+params.keyword+'%'];
    }
    connection.query(list_sql,params_arr,function (err, result) {
        fail(err);
        jsonWrite(res,{
            status:0,
            statusinfo:'',
            data:result
        });
        res.end();
    }); 
})

//根据id获取商品信息
router.post('/getThis',function(req,res){
    let params = req.body;
    let id =  params.id;
    connection.query(sqls.getThis,[id],function(err,result){
        fail(err,res);
        jsonWrite(res,{
            status:0,
            statusinfo:'请求成功',
            data:result[0]
        });
    })
})


//获取购物车中商品
router.post('/getCart',function(req,res){
    let params = req.body;
    connection.query(sqls.getCart,[params.user_id],function(err,result){
        fail(err,res);
        jsonWrite(res,{
            status:0,
            statusinfo:'请求成功',
            data:result
        });
        res.end();
    })
})

//添加商品到购物车
router.post('/addToCart',function(req,res){
    let params = req.body;
    let params_arr = [
        params.user_id,
        params.shop_id,
        params.id,
        params.shop_name,
        params.shop_address,
        params.name,
        params.price,
        params.images,
        params.part_ids,
        params.select_size,
        params.select_type,
        params.quantity,
        new Date(),
        new Date(),
        0
    ];
    connection.query(sqls.addCart,params_arr,function(err,result){
        fail(err,res);
        jsonWrite(res,{
            status:0,
            statusinfo:'请求成功',
            data:result
        });
        res.end();
    })
})

//编辑购物车中的商品
router.post('/editToCart',function(req,res){
    let params = req.body;
    console.log(params.quantity,params.item_id);
    let params_arr = [
        params.quantity,
        new Date(),
        params.item_id
    ];
    connection.query(sqls.editCart,params_arr,function(err,result){
        // console.log(result);
        fail(err,res);
        jsonWrite(res,{
            status:0,
            statusinfo:'请求成功',
            data:result
        });
        res.end();
    })
})

//删除购物车中的记录
router.post('/delCart',function(req,res){
    let params = req.body;
    connection.query(sqls.delCart,[params.id,params.user_id],function(err,result){
        fail(err,res);
        jsonWrite(res,{
            status:0,
            statusinfo:'请求成功',
            data:result
        });
        res.end();
    })
})


module.exports = router;