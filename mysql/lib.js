const config=require('../config/index');
const mysql=require('mysql');

const pool=mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
});

let query=(sql,value)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            };
            connection.query(sql,value,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                };
                connection.release();
            })
        })
    })
}

//建表函数
let createTable=(sql)=>{
    return query(sql,[]);
};

