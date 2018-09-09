const captchapng=require('captchapng');
const md5=require('md5');
const TokenModel=require('../../middlewares/token');
const UserModel=require('../../mysql/lib');

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
                    return ctx.body={
                        status:2,
                        data:{
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
            console.log(res)
        });

    },
    postSignup:async (ctx,next)=>{
        let userData=ctx.request.body;
        let username=userData.username;
        let password=userData.password;
        let repassword=userData.repassword;
        let role=userData.role || 1;//角色0-管理员 1-用户
        let question=userData.question;
        let answer=userData.answer;
        try{
            if(!username){
                throw new Error('请输入用户名');
            }
            if(!password){
                throw new Error('请输入密码')
            }
            if(password!=repassword){
                throw new Error('两次密码不一致')
            }
            if(role==1){
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

    },
    getQestions:async(ctx,next)=>{
    //    let questions=await  ; 
    }
}