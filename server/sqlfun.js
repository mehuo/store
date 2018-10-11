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
        add : 'INSERT INTO t_store(name,address,create_time,update_time,is_delete) values (?,?,?,?,?);',
        edit : 'UPDATE t_store SET name = ?,address = ? WHERE id = ?;',
        delete : 'DELETE FROM t_store WHERE id = ?',
        total : 'SELECT COUNT(*) total FROM t_store WHERE NAME LIKE ?',
        list : 'SELECT * FROM t_store WHERE name like ? limit ?,?',
        getThisStore : 'SELECT * FROM t_store WHERE id = ?;'
    },
    product:{
    	add : 'INSERT INTO t_product(name,shop_id,price,size_detail,type_detail,part_ids,images,detail,key_words,create_time,update_time,is_delete) values (?,?,?,?,?,?,?,?,?,?,?,?);',
        delete : 'DELETE FROM t_product WHERE id = ?',
        total : 'SELECT COUNT(*) total FROM t_product WHERE shop_id = ? AND name LIKE ? ',
        list : 'SELECT * FROM t_product WHERE shop_id = ? AND name LIKE ? limit ?,?',
    },
    util:{
        province : 'SELECT * FROM province;',
        city : 'SELECT * FROM city WHERE provincecode = ?;',
        area : 'SELECT * FROM area WHERE citycode = ?;'
    }
}

module.exports = sqlMap;
module.exports.limit = limit;