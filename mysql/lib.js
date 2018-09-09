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
}

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
createTable(mysqlTable.ships);
//创建Banner表
createTable(mysqlTable.banner);
//创建产品收藏表
createTable(mysqlTable.product_love);

module.exports={
    //添加用户
    addUser:(values)=>{
        let _sql=`insert into users set ${values}`;
        return query(_sql,values)
    },
    //查找用户(根据username)
    findUserByName:(name)=>{
        let _sql=`select * from users where username="${name}"`;
        return query(_sql);
    },
    //查找用户(根据id)
    findUserById:(id)=>{
        let _sql=`select * from users where id=${id}`;
        return query(_sql);
    },
    //删除用户
    delUser:(id)=>{
        let _sql=`delete from users where id in (${id})`;
        return query(_sql);
    },
    //更新用户信息
    updateUser:(values,id)=>{
        let _sql=`update users set ${values} where id=${id}`;
    }
}

