
const moment=require('moment');
const questionModel=require('../../mysql/questions')
module.exports={
    addQuestion:async(ctx,next)=>{
        let question =ctx.request.body.question;
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        await questionModel.findQuestionByName(question).then(async res=>{
            if(res.length){
                return ctx.body={
                    status:1,
                    data:'问题存在'
                } 
            }else{
                await questionModel.addQuestion([question,time]).then(res=>{
                    if(res.serverStatus==2){
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
                })
            }
        })
        
    },
    getQestions:async(ctx,next)=>{
        let questionLen=await questionModel.getQuestionCounts();
        let questionCounts=questionLen[0].total_counts;
        let pageSize=parseInt(ctx.request.query.page ||1)
        let limit=parseInt(ctx.request.query.limit || 10);
        let startCount=(pageSize-1)*limit;
        let questionPages=Math.ceil(questionCounts/limit);

        let questions;
        try{
            questions=await questionModel.getQuestions([startCount,limit]);
        }catch(e){
            return ctx.body={
                status:0,
                data:'获取失败'
            }
        }
        return ctx.body={
            status:2,
            data:{
                info:questions,
                totalPages:questionPages
            }
        }
    },
    delQuestion:async (ctx,next)=>{
        let id=ctx.request.body.id;
        await questionModel.delQuestion(id).then(res=>{
            if(res.affectedRows==2){
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
    findQuestionById:async (ctx,next)=>{
        try{
            let id=ctx.request.query.id;
            let questionDetail=await questionModel.findQuestionById(id);
            return ctx.body={
                status:2,
                data:questionDetail
            }
        }catch(e){
            return ctx.body={
                status:1,
                data:'获取信息失败'
            }
        }
    },
    updateQuestion:async (ctx,next)=>{
        let id=ctx.request.body.id;
        let question=ctx.request.body.question;
        try{
            if(!id){
                throw new Error('问题ID不能为空')
            }
            if(!question){
                throw new Error('问题不能为空')
            }
        }catch(e){
           return ctx.body={
               status:0,
               data:e.message
           } 
        };
        console.log(id)
        let time=moment().format('YYYY-MM-DD HH:mm:ss');
        await questionModel.updateQuestion([question,time],id).then(res=>{
            if(res.affectedRows==1){
                return ctx.body={
                    status:2,
                    data:'更新成功'
                }
            }else{
                return ctx.body={
                    status:1,
                    data:'更新失败'
                } 
            }
            
        })
    }
}