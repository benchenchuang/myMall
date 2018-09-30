const jwt = require('jsonwebtoken');
const jwtAdd='29296549@qq.com';

module.exports={
    createToken:(user_id)=>{
        let token=jwt.sign({
            user_id:user_id
        },jwtAdd,{
            expiresIn:60*30*24
        });
        return token;
    },
    adminCheck:async (ctx,next)=>{
        let token=ctx.request.body.token || ctx.query.token || ctx.session.token;
        try{
            if(token){
                let decodeToken=jwt.decode(token,jwtAdd);
                if(decodeToken.exp<(new Date()/1000)){
                    ctx.session.user='';
                    ctx.session.token='';
                    throw new Error('token已过期，请重新登录');
                }
            }else{
                throw new Error('token不存在，请登录');
            }
        }catch(e){
            return ctx.redirect('/admin/login')
        }
        await next();
    },
    checkToken:async(ctx,next)=>{
        let token=ctx.request.header.authorization || ctx.request.body.token || ctx.query.token || ctx.session.token;
        try{
            if(token){
                let decodeToken=jwt.decode(token,jwtAdd);
                if(decodeToken.exp<(new Date()/1000)){
                    throw new Error('token已过期，请重新登录');
                }
                await next();
            }else{
                throw new Error('token不存在，请登录');
            }
        }catch(e){
            ctx.body={
                status:4,
                data:e.message
            }
        }
        // await next();
    },
    tokenGetUser:(token)=>{
        let decodeToken=jwt.decode(token,jwtAdd);
        return decodeToken.user_id;
    }
}
