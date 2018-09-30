
const query=require('./index');

module.exports={
    //获取购物车列表
    getCarts:(userId)=>{
        let _sql=`select a.*,b.name,b.price,b.banner_images,b.stock,b.status from (select * from cart where user_id=${userId})as a 
                LEFT JOIN product as b on a.product_id=b.id ORDER by b.status`;
        return query(_sql);
    },
    //添加购物车
    addCart:(values)=>{
        let _sql="insert into cart set user_id=?,product_id=?,quantity=1,checked=false, create_time=?";
        return query(_sql,values);
    },
    //更新购物车
    updateCart:(id,userId,time,quantity,checked)=>{
        let _sql=`update cart set `;
        if(quantity){
            _sql+=`quantity=quantity+${quantity},`;
        }
        if(checked===true || checked===false){
            _sql+=`checked=${checked},`
        }
        _sql+=`update_time='${time}' where user_id=${userId} and product_id in (${id})`
        console.log(_sql)
        return query(_sql);
    },
    //删购物车
    delCart:(id)=>{
        let _sql=`delete from cart where id in (${id})`;
        return query(_sql);
    },
    //获取购物车商品详情
    findCart:(userId,id)=>{
        let _sql=`select * from cart where user_id=${userId} and product_id=${id}`;
        return query(_sql);
    }
}

