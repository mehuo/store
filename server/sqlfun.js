// sql语句
var limit = 10;
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT password FROM t_user WHERE name = ?;',
        add: 'INSERT INTO t_user(name, password , role , create_time , update_time , is_delete) values (?, ? ,? ,?,?,?);',
    	total : 'SELECT COUNT(*) total FROM t_user WHERE NAME LIKE ?',
    	list : 'SELECT * FROM t_user WHERE name like ? limit ?,?'
    },
    store : {
        add : 'INSERT INTO t_store(name,address,create_time,update_time,is_delete) values (?,?,?,?,?);'
    },
    product:{
    	add : 'INSERT INTO t_product(name,shop_id,price,size_detail,type_detail,part_ids,images,detail,key_words,create_time,update_time,is_delete) values (?,?,?,?,?,?,?,?,?,?,?,?);'
    },
    util:{
        province : 'SELECT * FROM province;',
        city : 'SELECT * FROM city WHERE provincecode = ?;',
        area : 'SELECT * FROM area WHERE citycode = ?;',
    }
}

module.exports = sqlMap;
module.exports.limit = limit;