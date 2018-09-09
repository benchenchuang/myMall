
module.exports={
    getLogin:async (ctx,next)=>{
        await ctx.render('./users/login', {
            title: 'Hello Koa 2!',
            index:1,
            user:{
                username:'chen'
            }
        })
    },
    getQestion:async(ctx,next)=>{
        await ctx.render('./users/questions',{
            title:'密码问题列表',
            index:10,
            user:{
                username:'chen'
            }
        })
    },
    loginOut:async(ctx,next)=>{
        ctx.session.user='';
        ctx.session.token='';
        return ctx.redirect('./login')
    }
}