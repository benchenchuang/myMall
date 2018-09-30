const bannerModel=require('../../mysql/banners');
const sortModel=require('../../mysql/sorts');
const productModel=require('../../mysql/product');
const moment=require('moment');
const cartModel=require('../../mysql/cart');
const addressModel=require('../../mysql/address');
const userModel=require('../../mysql/users');
const Token=require('../../middlewares/token');

module.exports={
    webHome:async(ctx,next)=>{
        let banners=await bannerModel.getBannerOn();
        let startCount=0;
        let limit=20;
        let sorts=await sortModel.getSorts([startCount,limit]);
        let shops=await productModel.getShops([startCount,limit],'',1,1,1);
        shops.forEach(element => {
            element.banner_images=JSON.parse(element.banner_images)
        });
        return ctx.body={
            status:2,
            data:{
                banners:banners,
                sorts:sorts,
                shops:shops
            }
        }
    },
    collectShop:async(ctx,next)=>{
        let getData=ctx.request.body;
        let userId=getData.userId;
        let product_id=getData.id;
        try{
            if(!userId){
                throw new Error("请登录后再收藏")
            }
            if(!product_id){
                throw new Error('产品不存在')
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:e.message
            }
        }
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        await productModel.findCollect(userId,product_id).then(async res=>{
            if(res.length){
               return ctx.body={
                    status:1,
                    data:'请勿重复收藏'
               } 
            }
            await productModel.collectShop([userId,product_id,time]).then(res=>{
                if(res.affectedRows){
                    return ctx.body={
                        status:2,
                        data:'收藏成功'
                    } 
                }else{
                    return ctx.body={
                        status:3,
                        data:'收藏失败'
                    } 
                }
            })
        });
    },
    cancelShop:async (ctx,next)=>{
        let getData=ctx.request.body;
        let id=getData.id;
        try{
            if(!id){
                throw new Error("产品不存在")
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:e.message
            }
        }
        await productModel.cancleShop(id).then(async res=>{
            if(res.affectedRows){
                return ctx.body={
                    status:2,
                    data:'收藏取消'
                } 
            }else{
                return ctx.body={
                    status:3,
                    data:'取消失败'
                } 
            }
        })
        
    },
    addCart:async (ctx,next)=>{
        let getData=ctx.request.body;
        let product_id=getData.id;
        let token=getData.token;
        let quantity=getData.quantity;
        let checked=getData.checked;
        let userId=Token.tokenGetUser(token);
        try{
            if(!userId){
                throw new Error('用户不存在')
            }
            if(!product_id){
                throw new Error('产品不存在')
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:e.message
            }
        }
        
        await cartModel.findCart(userId,product_id).then(async res=>{
            let time=moment().format('YYYY-MM-DD HH:mm:ss');
            if(res.length){
                let cartShop=await cartModel.findCart(userId,product_id);
                let shopNum=await productModel.ShopDetail(product_id);
                let shopCount=shopNum[0].stock;
                let cartCount=cartShop[0].quantity;
                try{
                    if(quantity>0 && shopCount<cartCount+quantity){
                        throw new Error("商品数量不足")
                    }
                    if(quantity<0 && cartCount<=-quantity){
                        throw new Error('购物车商品数量不足')
                    }
                }catch(e){
                    return ctx.body={
                        status:0,
                        data:e.message
                    }
                }
                await cartModel.updateCart(product_id,userId,time,quantity,checked).then(res=>{
                    if(res.affectedRows){
                        return ctx.body={
                            status:2,
                            data:'更新成功'
                        } 
                    }else{
                        return ctx.body={
                            status:3,
                            data:'更新失败'
                        } 
                    }
                });
            }else{
                await cartModel.addCart([userId,product_id,time]).then(res=>{
                    if(res.affectedRows){
                        return ctx.body={
                            status:2,
                            data:'成功添加'
                        } 
                    }else{
                        return ctx.body={
                            status:3,
                            data:'添加失败'
                        } 
                    }
                })
            }
        })
    },
    delCart:async (ctx,next)=>{
        let getData=ctx.request.body;
        let id=getData.id;
        await cartModel.delCart(id).then(res=>{
            if(res.affectedRows){
                return ctx.body={
                    status:2,
                    data:'删除成功'
                }
            }else{
                return ctx.body={
                    status:3,
                    data:'删除失败'
                }  
            }
        })
    },
    getCarts:async (ctx,next)=>{
        let getData=ctx.request.query;
        let token=getData.token;
        let userId=Token.tokenGetUser(token);
        try{
            if(!userId){
                throw new Error('用户不存在，请重新登录')
            }
        }catch(e){
            return ctx.body={
                status:4,
                data:e.message
            }
        }
        await cartModel.getCarts(userId).then(res=>{
            res.forEach(element => {
                element.banner_images=JSON.parse(element.banner_images)
            });
            return ctx.body={
                status:2,
                data:{
                    carts:res,
                }
            }
        })
    },
    findUserById:async (ctx,next)=>{
        let token=ctx.request.header.authorization || ctx.request.query.token;
        let userId=Token.tokenGetUser(token);
        let userInfo;
        try{
            userInfo=await userModel.findUserById(userId);
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }
        return ctx.body={
            status:2,
            data:{
                info:userInfo[0]
            }
        }

    },
    getCollects:async (ctx,next)=>{
        let token=ctx.request.header.authorization || ctx.request.query.token;
        let userId=Token.tokenGetUser(token);
        let collects;
        try{
            collects=await productModel.getCollects(userId);
            collects.forEach(item=>{
                item.banner_images=JSON.parse(item.banner_images);
            });
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }
        return ctx.body={
            status:2,
            data:{
                collects:collects
            }
        }

    },
    getAddressList:async (ctx,next)=>{
        let token=ctx.request.header.authorization;
        let userId=Token.tokenGetUser(token) || ctx.request.query.userId;
        await addressModel.getAddressList(userId).then(res=>{
            return ctx.body={
                status:2,
                data:{
                    address:res,
                }
            }
        });
    },
    addAddress:async(ctx,next)=>{
        let getData=ctx.request.body;
        let token=ctx.request.header.authorization || ctx.request.body.token;
        let id=getData.id || '';
        let userId=Token.tokenGetUser(token);
        let name=getData.ship_name;
        let phone=getData.ship_phone;
        let address=getData.ship_address;
        let checked=getData.checked;
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        if(checked===true || checked==false){
            await addressModel.updateAddress(userId);
        };
        await addressModel.addAdress(userId,name,phone,address,time,checked,id).then(res=>{
            if(res.affectedRows){
                if(id){
                    return ctx.body={
                        status:2,
                        data:'更新成功'
                    }
                }
                return ctx.body={
                    status:2,
                    data:'成功添加'
                }
            }else{
                return ctx.body={
                    status:3,
                    data:'添加失败'
                } 
            }
        });
        
    },
    delAddress:async(ctx,next)=>{
        let id=ctx.request.body.id;
        await addressModel.delAddress(id).then(res=>{
            if(res.affectedRows){
                return ctx.body={
                    status:2,
                    data:'删除成功'
                }
            }else{
                return ctx.body={
                    status:3,
                    data:'删除失败'
                }  
            }
        })
    },
    detailAddress:async (ctx,next)=>{
        let id=ctx.request.query.id;
        await addressModel.detailAddress(id).then(res=>{
            return ctx.body={
                status:2,
                data:{
                    detail:res[0],
                }
            }
        })
    }
}


const schedule = require("node-schedule");
var date = new Date(2018,8,28,17,19,0);
var rule = new schedule.RecurrenceRule();
rule.second = 0;
var j = schedule.scheduleJob(rule, function(){
　console.log("执行任务111111111111");
});