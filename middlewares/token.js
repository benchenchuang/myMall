const jwt = require('jsonwebtoken');
const jwtAdd='29296549@qq.com';

module.exports={
    createToken:(user_id)=>{
        let token=jwt.sign({
            user_id:user_id
        },jwtAdd,{
            expiresIn:60*30
        });
        return token;
    }
}
