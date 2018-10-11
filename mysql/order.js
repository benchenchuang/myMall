
const query=require('./index');

module.exports={
    //获取订单列表
    getOrders(userId,start,limit){
        let _sql=`select t.* from (select a.*,c.ship_name,c.ship_phone,c.ship_address,d.username from `;
        if(userId){
            if(!start && !limit){
                _sql+=`(select * from orders order by -id)`
            }else{
                _sql+=`(select * from orders where user_id=${userId} order by -id limit ${start},${limit} )`
            }
        }else{
            if(!start && !limit){
                _sql+=`(select * from orders order by -id)`
            }else{
                _sql+=`(select * from orders order by -id limit ${start},${limit})`
            }
        }
         _sql+=` a LEFT JOIN address c on a.ship_id=c.id LEFT JOIN users d on a.user_id=d.id) t`;
        return query(_sql);
    },
    //获取订单明细表
    getOrderItem(orderId,userId){
        let _sql=`select * from order_item `;
        if(orderId){
            _sql+=`where order_id=${orderId}`
        }else if(userId){
            _sql+=`where user_id=${userId}`
        }
        return query(_sql);
    },
    //获取订单表详情
    getOrderDetail(orderId){
        let _sql=`select a.*,c.ship_name,c.ship_phone,c.ship_address,d.username from (select * from orders where id=${orderId}) as a
                LEFT JOIN address as c on a.ship_id=c.id LEFT JOIN users d on a.user_id=d.id`;
        return query(_sql);
    },
    //删除订单
    delOrder(id){
        let _sql=`delete orders,order_item from orders
         left join order_item on orders.id=order_item.order_id where orders.id in (${id})`;
        return query(_sql);
    },
    //创建订单
    createOrder(values){
        let _sql=`insert into orders set order_no=?,user_id=?,ship_id=?,pay_money=?,pay_type=?,status=?,payment_time=?,create_time=?`;
        return query(_sql,values);
    },
    //更新订单状态
    updateOrderStatus(status,time,id){
        let _sql=`update orders set status=${status},update_time='${time}' where id=${id}`;
        return query(_sql);
    },
    //创建订单明细表
    createOrderItem(values){
        let _sql=`insert into order_item set user_id=?,order_id=?,order_no=?,product_id=?,product_name=?,product_image=?,product_price=?,quantity=?,total_price=?,create_time=?`;
        return query(_sql,values);
    },
}

