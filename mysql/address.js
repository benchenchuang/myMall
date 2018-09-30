
const query=require('./index');

module.exports={
    //获取地址列表
    getAddressList(userId){
        let _sql=`select * from address where user_id=${userId}`;
        return query(_sql);
    },
    //添加地址-更新
    addAdress(userId,name,phone,address,time,checked,id){
        let _sql;
        if(id){
            _sql=`update address set `;
            if(phone){
                _sql+=`ship_name='${name}',`
            }
            if(name){
                _sql+=`ship_name=${phone},`
            }
            if(address){
                _sql+=`ship_name='${address}',`
            }
            if(checked===false){
                _sql+=`checked=0,`
            }
            if(checked===true){
                _sql+=`checked=1,`
            }
            _sql+=`update_time='${time}' where id=${id}`;

        }else{
            _sql=`insert into address set user_id=${userId},ship_name=${name},ship_phone=${phone},ship_address=${address},create_time='${time}',checked=${checked}`;
        }
        console.log(_sql);
        return query(_sql);
    },
    updateAddress(userId){
        let _sql=`update address set checked=0 where user_id=${userId}`;
        console.log(_sql)
        return query(_sql);
    },
    //删除地址
    delAddress(id){
        let _sql=`delete from address where id in (${id})`;
        return query(_sql);
    },
    //地址详细
    detailAddress(id){
        let _sql=`select * from address where id =${id}`;
        return query(_sql);
    }
}

