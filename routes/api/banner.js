
const moment=require('moment');
const bannerModel=require('../../mysql/banners');

module.exports={
    getBannerList:async (ctx,next)=>{
        let bannersCounts=await bannerModel.getBannerCounts();
        let bannersLen=bannersCounts[0].total;
        let pageSize=parseInt(ctx.request.query.page || 1);
        let limit=parseInt(ctx.request.query.limit || 10);
        let startCount=(pageSize-1)*limit;
        let totalPages=Math.ceil(bannersLen/limit);
        let banners;
        try{
            banners=await bannerModel.getBanners([startCount,limit]);
        }catch(e){
            return ctx.body={
                status:0,
                data:'获取失败'
            }
        }
        return ctx.body={
            status:2,
            data:{
                info:banners,
                totalPages:totalPages
            }
        }

    },
    getBannerOnLine:async (ctx,next)=>{
        let banners;
        try{
            banners=await bannerModel.getBannerOn();
        }catch(e){
            return ctx.body={
                status:0,
                data:'获取失败'
            }
        }
        return ctx.body={
            status:2,
            data:{
                info:banners,
                totalPages:totalPages
            }
        }
    },
    delBanner:async(ctx,next)=>{
        let id=ctx.request.body.id;
        await bannerModel.delBanner(id).then(res=>{
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
    findBannerById:async (ctx,next)=>{
        try{
            let id=ctx.request.query.id;
            let bannerDedeil=await bannerModel.findBannerById(id);
            return ctx.body={
                status:2,
                data:bannerDedeil
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:'获取信息失败'
            }
        }
    },
    addBanner:async (ctx,next)=>{
        let formData=ctx.request.body;
        let bannerId=formData.id;
        let bannerIndex=formData.show_index || 1;
        let bannerImg=formData.image;
        let bannerTitle=formData.title;
        let bannerLink=formData.link;
        let bannerStatus=formData.status || 1;
        let reg=/^[1-9]+[0-9]*]*$/
        try{
            if(!bannerImg){
                throw new Error('图片不能为空')
            }
            if(!reg.test(bannerIndex)){
                throw new Error('显示序号非数字');
            }
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }
        
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        if(!bannerId){
            await bannerModel.addBanner([bannerIndex,bannerImg,bannerLink,bannerTitle,bannerStatus,time]).then(res=>{
                if(res.affectedRows){
                    return ctx.body={
                        status:2,
                        data:"添加成功"
                    }
                }
                return ctx.body={
                    status:3,
                    data:"添加失败"
                }
            })
        }else{
            await bannerModel.updateBanner([bannerIndex,bannerImg,bannerLink,bannerTitle,bannerStatus,time],bannerId).then(res=>{
                if(res.affectedRows){
                    return ctx.body={
                        status:2,
                        data:"更新成功"
                    }
                }
                return ctx.body={
                    status:3,
                    data:"更新失败"
                }
            })
        }
    },
    updateBannerStatus:async(ctx,next)=>{
        let getData=ctx.request.body;
        let id=getData.id;
        let status=getData.status;
        try{
            if(!id){
                throw new Error('ID不能为空')
            }
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        };

        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        await bannerModel.updateBannerStatus([status,time],id).then(res=>{
            if(res.affectedRows){
                return ctx.body={
                    status:2,
                    data:"修改成功"
                }
            }
            return ctx.body={
                status:3,
                data:"修改失败"
            }
        })
    }
}