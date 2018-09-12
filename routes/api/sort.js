
const moment=require('moment');
const sortModel=require('../../mysql/sorts');

module.exports={
    getSortList:async (ctx,next)=>{
        let sortCounts=await sortModel.getSortsCounts();
        let sortsLen=sortCounts[0].total;
        let pageSize=parseInt(ctx.request.query.page || 1);
        let limit=parseInt(ctx.request.query.limit || 10);
        let startCount=(pageSize-1)*limit;
        let totalPages=Math.ceil(sortsLen/limit);
        let sorts;
        try{
            sorts=await sortModel.getSorts([startCount,limit]);
        }catch(e){
            return ctx.body={
                status:0,
                data:'获取失败'
            }
        }
        return ctx.body={
            status:2,
            data:{
                info:sorts,
                totalPages:totalPages
            }
        }

    },
    delSort:async(ctx,next)=>{
        let id=ctx.request.body.id;
        await sortModel.delSort(id).then(res=>{
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
    findSortById:async (ctx,next)=>{
        try{
            let id=ctx.request.query.id;
            let sortDetail=await sortModel.findSortById(id);
            return ctx.body={
                status:2,
                data:sortDetail
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:'获取信息失败'
            }
        }
    },
    addSort:async (ctx,next)=>{
        let formData=ctx.request.body;
        let sortId=formData.id;
        let sortName=formData.sort_name;
        let sortImg=formData.sort_image;
        let sortIndex=formData.sort_index;
        let reg=/^[1-9]+[0-9]*]*$/
        try{
            if(!sortImg){
                throw new Error('图片不能为空')
            }
            if(!reg.test(sortIndex)){
                throw new Error('显示序号非数字');
            }
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }
        
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        if(!sortId){
            await sortModel.findSortByName(sortName).then(async res=>{
                if(res.length){
                    return ctx.body={
                        status:1,
                        data:"类别名已存在，请修改"
                    }
                }else{
                    await sortModel.addSort([sortName,sortImg,sortIndex,time]).then(res=>{
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
                }
            })
            
        }else{
            await sortModel.updateSort([sortName,sortImg,sortIndex,time],sortId).then(res=>{
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
        
        
    }
}