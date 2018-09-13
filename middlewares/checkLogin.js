module.exports={
    checkLogin:async(ctx,next)=>{
        try{
            if(ctx.session.token){
                return ctx.redirect('/admin')
            }
        }catch(e){
            return ctx.redirect('/admin/login')
        }
        await next();
    },
    checkNotLogin:async (ctx,next)=>{
        if(!ctx.session.token){
            return ctx.redirect('/admin/login')
        };
        await next();
    }
}