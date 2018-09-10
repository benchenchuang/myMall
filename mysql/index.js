const config=require('../config/index');
const mysql=require('mysql');
const mysqlTable=require('../mysql_table/index');

const pool=mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
});

let query=(sql,values)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err)
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows)
                    }
                    connection.release();
                })
            }
        })
    })
};

//建表函数
let createTable=(sql)=>{
    return query(sql,[]);
};
//创建用户表
createTable(mysqlTable.users);
//创建分类表
createTable(mysqlTable.category);
//创建产品表
createTable(mysqlTable.product);
//创建购物车表
createTable(mysqlTable.cart);
//创建支付表
createTable(mysqlTable.pay_info);
//创建订单表
createTable(mysqlTable.orders);
//创建订单明细表
createTable(mysqlTable.order_item);
//创建收货地址表
createTable(mysqlTable.address);
//创建Banner表
createTable(mysqlTable.banner);
//创建产品收藏表
createTable(mysqlTable.product_love);
//创建问题
createTable(mysqlTable.questions);

module.exports = query;