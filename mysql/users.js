
const query=require('./index');

module.exports={
    //添加用户
    addUser:(values)=>{
        let _sql='insert into users set username=?,password=?,role=?,create_time=?,question=?,answer=?,update_time=?';
        return query(_sql,values)
    },
    //查找用户(根据username)
    findUserByName:(name)=>{
        let _sql=`select * from users where username like '%${name}%'`;
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
    },
    //获取用户列表
    getUsers:(values)=>{
        let _sql=`select * from users limit ?,?`
        return query(_sql,values);
    },
    //获取用户数量
    getUsersCounts:()=>{
        let _sql='select count(*) as total_counts from users';
        return query(_sql);
    }
}

