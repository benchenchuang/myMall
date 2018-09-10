
module.exports={
    getIndex:async (ctx,next)=>{
        await ctx.render('./index', {
            title: 'Hello Koa 2!',
            index:1,
            user:ctx.session.user
        })
    },
    getLogin:async (ctx,next)=>{
        await ctx.render('./users/login', {
            title: 'Hello Koa 2!',
            index:1,
            user:ctx.session.user
        })
    },
    getUsers:async (ctx,next)=>{
        await ctx.render('./users/users',{
            title:"用户列表",
            index:9,
            user:ctx.session.user
        })
    },
    getQestion:async(ctx,next)=>{
        await ctx.render('./users/questions',{
            title:'密码问题列表',
            index:10,
            user:ctx.session.user
        })
    },
    loginOut:async(ctx,next)=>{
        ctx.session.user='';
        ctx.session.token='';
        return ctx.redirect('./login')
    }
}