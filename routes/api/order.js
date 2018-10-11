
const moment=require('moment');
const uuid=require('uuid');
const orderModel=require('../../mysql/order');
const shopModel=require('../../mysql/product');
const cartModel=require('../../mysql/cart');
const Token=require('../../middlewares/token');
const schedule = require("node-schedule");

module.exports={
    getOrderList:async (ctx,next)=>{
        let getDatas=ctx.request.query;
        let token=getDatas.token || ctx.request.header.authorization;
        let user_id='';
        if(token){
            user_id=Token.tokenGetUser(token);
        };
        let pageSize=parseInt(getDatas.page || 1);
        let limit=parseInt(getDatas.limit || 10);
        let startCount=(pageSize-1)*limit;
        let dataCounts=await orderModel.getOrders(user_id);
        let counts=dataCounts.length;
        let totalPages=Math.ceil(counts/limit);

        let orders=await orderModel.getOrders(user_id,startCount,limit);
        let orderItems=await orderModel.getOrderItem('',user_id);
        orders.forEach(el=>{
            el.order_items=[];
            orderItems.forEach(item=>{
                if(item.order_id==el.id){
                    el.order_items.push(item);
                }
            })
        });
        
        return ctx.body={
            status:2,
            data:{
                orders:orders,
                totalPages:totalPages
            }
        }
    },
    addOrder:async (ctx,next)=>{
        let data=ctx.request.body;
        let token=ctx.request.header.authorization || ctx.request.body.token;
        let user_id=Token.tokenGetUser(token);
        // let order_no=uuid.v1();
        let ship_id=data.ship_id;
        let pay_item=data.item;
        let pay_type=data.pay_type;
        let status=data.status;
        let shops=[];
        var all_money=0;

        for(let i=0;i<pay_item.length;i++){
            let itemData=await shopModel.ShopDetail(pay_item[i].product_id);
            pay_item[i].price=itemData[0].price;
            shops.push(pay_item[i]);
        };
        
        for(let i=0;i<shops.length;i++){
            all_money+=shops[i].price*shops[i].count;
        }
        var formatDateTime = function (date) {  
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();  
            h=h < 10 ? ('0' + h) : h;  
            var minute = date.getMinutes();  
            minute = minute < 10 ? ('0' + minute) : minute;  
            var second=date.getSeconds();  
            second=second < 10 ? ('0' + second) : second;  
            return y+''+m+d+h+minute+second;
        };
        
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        let end_no=Math.random().toString(2).substr(3,6);
        let order_no=formatDateTime(new Date())+''+end_no;
        await orderModel.createOrder([order_no,user_id,ship_id,all_money,pay_type,status,'',time]).then(async res=>{
            if(res.insertId){
                let orderId=res.insertId;
                shops.forEach(async item=>{
                    let time=moment().format('YYYY-MM-DD HH:mm:ss');
                    let end_no=Math.random().toString(2).substr(3,6);
                    let order_no=formatDateTime(new Date())+''+end_no;
                    let total_price=item.price*item.count;
                    await orderModel.createOrderItem([user_id,orderId,order_no,item.product_id,item.title,item.pic,item.price,item.count,total_price,time]).then(async res=>{
                        if(res.affectedRows){
                            if(item.id){
                                await cartModel.delCart(item.id);
                            }
                            await shopModel.updateShopCount(item.product_id,2,item.count);
                        }
                    })
                });
                await orderModel.getOrderDetail(orderId).then(res=>{
                    return ctx.body={
                        status:2,
                        data:{
                            order:res[0]
                        }
                    }
                });
            }else{
                return ctx.body={
                    status:3,
                    data:'订单提交错误'
                }
            }
        });
    },
    getOrder:async (ctx,next)=>{
        let data=ctx.request.query;
        let orderId=data.id;

        let order;
        let orderItem;
        try{
            order=await orderModel.getOrderDetail(orderId);
            orderItem=await orderModel.getOrderItem(orderId);
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }
        return ctx.body={
            status:2,
            data:{
                order:order[0],
                orderItem:orderItem
            }
        }

    },
    updateOrderStatus:async (ctx,next)=>{
        let data=ctx.request.body;
        let id=data.id;
        let status=data.status;
        let items=data.items;
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        if(status==0){
            await orderModel.getOrderDetail(id).then(async res=>{
                if(res[0].status==1){
                    await orderModel.updateOrderStatus(status,time,id).then(res=>{
                        if(res.affectedRows){
                            items.forEach(async item=>{
                                await shopModel.updateShopCount(item.product_id,1,item.quantity);
                            });
                            return ctx.body={
                                status:2,
                                data:"订单超时已取消"
                            }
                        }
                    });
                }
                return ctx.body={
                    status:2,
                    data:"订单超时已取消"
                } 
            })
        }else{
            await orderModel.updateOrderStatus(status,time,id);
        }
    },
    delOrder:async (ctx,next)=>{
        let data=ctx.request.body;
        let status=data.status;
        let id=data.id;
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        await orderModel.updateOrderStatus(status,time,id).then(res=>{
            if(res.affectedRows){
                return ctx.body={
                    status:2,
                    data:'订单状态更改'
                }
            }else{
                return ctx.body={
                    status:1,
                    data:'状态更改失败'
                } 
            }
        })
    }
};

var rule = new schedule.RecurrenceRule();
rule.second = 0;
var j = schedule.scheduleJob(rule, async function(){
   let res=await orderModel.getOrders();
   if(res.length){
       res.forEach(async item=>{
           let leftTime=caclEndTime(item.create_time,15);
           if(item.status==1 && leftTime<=0){
                let time=moment().format('YYYY-MM-DD HH:mm:ss');
                await orderModel.updateOrderStatus(0,time,item.id).then(async res=>{
                    if(res.affectedRows){
                        await orderModel.getOrderItem(item.id,'').then(async res=>{
                            console.log(res)
                            await res.forEach(async ele=>{
                                await shopModel.updateShopCount(ele.product_id,1,ele.quantity);
                            });
                            console.log('订单超时已取消');
                        })
                        
                    }
                });
           }
       })
   }
});

/**
 * 计算时间是否过期
 * @param {*} createTime 起始时间 格式2018-09-20 12:30:30
 * @param {*} subTime 间隔时间（分钟） 
 */
function caclEndTime(createTime,subTime){
    let time=new Date(createTime).toLocaleString();
    let startTime= new Date(time.replace("-","/"));
    let subMins=15;
    startTime.setMinutes(startTime.getMinutes()+subMins,startTime.getSeconds(),0);
    let endTime=new Date(startTime.toLocaleString().replace("-","/"));
    let nowTime=new Date(new Date().toLocaleString().replace("-","/"));
    let leftTime=(endTime.getTime()-nowTime.getTime())/1000;
    return leftTime;
}