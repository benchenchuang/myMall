const router = require('koa-router')({
prefix:'/api'
});
const Users=require('./api/users');

//获取四位数验证码
router.get('/code',Users.getCode);
//用户登录
router.post('/login',Users.postLogin);
//用户注册
router.post('/signup',Users.postSignup);
  
module.exports = router;