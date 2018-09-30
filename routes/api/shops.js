
const moment=require('moment');
const productModel=require('../../mysql/product');

module.exports={
    getProducts:async(ctx,next)=>{
        let getDatas=ctx.request.query;
        let pageSize=parseInt(getDatas.page || 1);
        let limit=parseInt(getDatas.limit || 10);
        let startCount=(pageSize-1)*limit;
        let sort=getDatas.sort;
        let recommend=getDatas.recommend;
        let status=getDatas.status;
        let onSale=getDatas.onSale;

        let dataCounts=await productModel.shopsCount(sort,recommend,status,onSale);
        let counts=dataCounts[0].total;
        let totalPages=Math.ceil(counts/limit);
        let allShops;
        try{
           allShops=await productModel.getShops([startCount,limit],sort,recommend,status,onSale);
           allShops.forEach(element => {
               element.banner_images=JSON.parse(element.banner_images)
           });
        }catch(e){
            return ctx.body={
                status:0,
                data:'获取失败'
            }
        }
        return ctx.body={
            status:2,
            data:{
                shops:allShops,
                totalPages:totalPages
            }
        };
    },
    addProduct:async (ctx,next)=>{
        let formData=ctx.request.body;
        let id=formData.id;
        let categoryId=formData.category_id;
        let productName=formData.name;
        let subTitle=formData.sub_title;
        let banners=JSON.stringify(formData.banner_images);
        let detail=formData.detail;
        let price=formData.price;
        let stock=formData.stock;
        let recommend=formData.recommend;
        let status=formData.status;

        try{
            if(!categoryId){
                throw new Error('请选择商品类型')
            }
            if(!productName){
                throw new Error('请输入商品名称');
            }
            if(!banners.length){
                throw new Error('请选择上传商品banner')
            }
            if(!detail){
                throw new Error('请输入商品详情')
            }
            if(!price.length){
                throw new Error('商品价格不能为空')
            }
            if(!stock){
                throw new Error('商品库存不能为空')
            }
            if(!recommend.length){
                throw new Error('推荐首页不能为空')
            }
            if(!status.length){
                throw new Error('商品状态不能为空')
            }
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }

        let time=moment().format('YYYY-MM-DD HH:mm:ss');

        await productModel.addShop([categoryId,productName,subTitle,banners,detail,price,stock,recommend,status,time],id).then(res=>{
            if(res.affectedRows){
                if(id){
                    return ctx.body={
                        status:2,
                        data:'更新成功'
                    }  
                }
                return ctx.body={
                    status:2,
                    data:'添加成功'
                }
            }else{
                return ctx.body={
                    status:3,
                    data:'添加失败'
                } 
            }
        });
    },
    delProduct:async (ctx,next)=>{
        let formData=ctx.request.body;
        let id=formData.id;

        await productModel.delShop(id).then(res=>{
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
    getProductDetail:async (ctx,next)=>{
        try{
            let id=ctx.request.query.id;
            let userId=ctx.request.query.userId || '';
            let collect=[];
            if(userId){
                collect=await productModel.findCollect(userId,id);
            };
            let shopDedeil=await productModel.ShopDetail(id);
            let shop=shopDedeil[0];
            shop.banner_images=JSON.parse(shop.banner_images)
            return ctx.body={
                status:2,
                data:{
                    shop:shop,
                    collect:collect
                }
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:'获取信息失败'
            }
        }
    }
}