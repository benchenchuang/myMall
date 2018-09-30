const captchapng=require('captchapng');
const md5=require('md5');
const moment=require('moment');
const TokenModel=require('../../middlewares/token');
const UserModel=require('../../mysql/users');

module.exports={
    getCode:async (ctx,next)=>{
        let str=parseInt(Math.random()*9000+1000);
        ctx.session.code=str;//保存验证码
        let pic=new captchapng(80,30,str);//生成图片
        pic.color(0,0,0,0);
        pic.color(80,80,80,255);
        let image=pic.getBase64();
        let imageBase64=new Buffer(image,'base64');
        ctx.response.type="image/png";
        ctx.body=imageBase64;
    },
    postLogin:async(ctx,next)=>{
        let formData=ctx.request.body;
        let type=formData.type;//type=0 后台登录 type=1用户端登录
        let username=formData.username;
        let password=formData.password;
        let code=formData.code;
        let sessionCode=ctx.session.code;

        try{
            if(!username){
                throw new Error('请输入用户名');
            }
            if(!password){
                throw new Error('请输入密码')
            }
            if(type==0){
                if(!code){
                    throw new Error('请输入验证码');
                }
                if(code!=sessionCode){
                    throw new Error("验证码输入错误")
                }
            }
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        };

        password=md5(password);

        await UserModel.findUserByName(username).then(res=>{
            if(!res){
                return ctx.body={
                    status:1,
                    data:'用户未注册' 
                }
            }else{
                let user=res[0];
                if(user.password==password){
                    user.password='';
                    ctx.session.user=user;
                    let token=TokenModel.createToken(user.id);
                    ctx.session.token=token;
                    return ctx.body={
                        status:2,
                        data:{
                            userId:user,
                            token:token
                        }
                    }
                }else{
                    return ctx.body={
                        status:3,
                        data:'登录密码错误' 
                    } 
                }
            }
        });

    },
    postSignup:async (ctx,next)=>{
        let userData=ctx.request.body;
        console.log(userData)
        let username=userData.username;
        let password=userData.password;
        let repassword=userData.repassword;
        let role=userData.role || 1;//角色0-管理员 1-用户
        let question=userData.question || '';
        let answer=userData.answer || '';
        try{
            if(!username){
                throw new Error('请输入用户名');
            }
            if(!password){
                throw new Error('请输入密码')
            }
            if(role==1){
                if(password!=repassword){
                    throw new Error('两次密码不一致')
                }
                if(!question){
                    throw new Error('请选择找回密码的问题');
                }
                if(!answer){
                    throw new Error("请输入找回密码问题的答案")
                }
            }
        }catch(e){
            return ctx.body={
                status:0,
                data:e.message
            }
        }
        
        password=md5(password);

        await UserModel.findUserByName(username).then(async res=>{
            if(!res.length){
                let time=moment().format('YYYY-MM-DD HH:mm:ss');
                await UserModel.addUser([username,password,role,time,question,answer,'']).then(res=>{
                    if(res.serverStatus==2){
                        return ctx.body={
                          status:2,
                          data:'注册成功'
                        }
                    }else{
                        return ctx.body={
                          status:3,
                          data:'注册失败，请重新注册'
                        }
                    }
                })
            }else{
                return ctx.body={
                    status:1,
                    data:'用户名已存在' 
                }
            }
        })

    },
    getUsers:async (ctx,next)=>{
        let total=await UserModel.getUsersCounts();
        let totalCouns=total[0].total_counts;
        let pageSize=parseInt(ctx.request.query.page || 1);
        let limit=parseInt(ctx.request.query.limit || 10);
        let startCounts=(pageSize-1)*limit;
        let totalPages=Math.ceil(totalCouns/limit);
        let getData=await UserModel.getUsers([startCounts,limit]);
        return ctx.body={
            status:2,
            data:{
                info:getData,
                total:totalCouns,
                totalPages:totalPages
            }
        }
    },
    delUser:async(ctx,next)=>{
        let userId=ctx.request.body.userId;
        await UserModel.delUser(userId).then(res=>{
            if(res.serverStatus==2){
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
    findName:async(ctx,next)=>{
        let username=ctx.request.body.username;
        let getData=await UserModel.findUserByName(username);
        return ctx.body={
            status:2,
            data:{
                info:getData,
            }
        }
    },
    addQuestion:async(ctx,next)=>{
        let question =ctx.request.body.question;
    }
}