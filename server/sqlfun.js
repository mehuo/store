// sql语句
var limit = 10;
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT * FROM t_user WHERE name = ?;',
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
        totalByShop : 'SELECT COUNT(*) total FROM t_product WHERE shop_id = ? AND name LIKE ? ',
        total : 'SELECT COUNT(*) total FROM t_product WHERE name LIKE ? ',
        listByShop : 'SELECT product.*,store.name as shop_name,store.address as shop_address FROM t_product AS product LEFT JOIN t_store AS store ON product.shop_id=store.id WHERE shop_id = ? AND product.name LIKE ? limit ?,?',
        list : 'SELECT product.*,store.name as shop_name,store.address as shop_address FROM t_product AS product LEFT JOIN t_store AS store ON product.shop_id=store.id WHERE product.name LIKE ? limit ?,?',
        allByShopId : 'SELECT * FROM t_product WHERE shop_id = ? AND name LIKE ?',
        allBySearch : 'SELECT * FROM t_product WHERE name LIKE ?',
        getThis : 'SELECT product.*,store.name as shop_name,store.address as shop_address FROM t_product AS product LEFT JOIN t_store AS store ON product.shop_id=store.id WHERE product.id = ?;',
        edit : 'UPDATE t_product SET name = ?,price = ?,size_detail=?,type_detail=?,part_ids=?,images=?,detail=?,key_words=?,update_time=? WHERE id = ?;',
        addCart : 'INSERT INTO t_cart(user_id,shop_id,product_id,shop_name,shop_address,name,price,images,part_ids,select_size,select_type,quantity,create_time,update_time,is_delete) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
        getCart : 'SELECT * FROM t_cart WHERE user_id = ?',
        editCart : 'UPDATE t_cart SET quantity = ?,update_time=? WHERE id = ?',
        delCart : 'DELETE FROM t_cart WHERE id = ? AND user_id = ? '
    },
    order:{
        add : 'INSERT INTO t_order(user_id,order_price,order_status) values(?,?,?);',
        productAdd : 'INSERT INTO t_order_product(order_id,user_id,product_id,product_name,product_price,product_quantity,select_size,select_type,product_status) values (?,?,?,?,?,?,?,?,?)'
    },
    address :{
        add: 'INSERT INTO t_address(user_id,address,name,phone,is_default,is_delete) values (?,?,?,?,?,?);',
        list: 'SELECT * FROM t_address WHERE user_id = ?;',
        clearDefault : 'UPDATE t_address SET is_default = 0 WHERE user_id = ? AND is_default = 1',
        setDefault : 'UPDATE t_address SET is_default = 1 WHERE user_id = ? AND id = ?',
        delete : 'DELETE FROM t_address  WHERE user_id = ? AND id = ?',
        edit : 'UPDATE t_address SET address = ?,name =?,phone=? WHERE user_id = ? AND id=?'
    },
    util:{
        province : 'SELECT * FROM province;',
        city : 'SELECT * FROM city WHERE provincecode = ?;',
        area : 'SELECT * FROM area WHERE citycode = ?;'
    }
}

module.exports = sqlMap;
module.exports.limit = limit;