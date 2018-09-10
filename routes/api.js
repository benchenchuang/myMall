const router = require('koa-router')({
prefix:'/api'
});
const Users=require('./api/users');
const Questions=require('./api/questions');

//获取四位数验证码
router.get('/code',Users.getCode);
//用户登录
router.post('/login',Users.postLogin);
//用户注册
router.post('/signup',Users.postSignup);
//用户列表
router.get('/users',Users.getUsers);
//删除用户
router.post('/del_user',Users.delUser);
//搜用户
router.post('/find_name',Users.findName);

//添加问题
router.post('/add_question',Questions.addQuestion);
//获取问题列表
router.get('/questions',Questions.getQestions);
//删除问题
router.post('/del_question',Questions.delQuestion);
//获取问题
router.get('/get_question',Questions.findQuestionById);
//修改问题
router.post('/update_question',Questions.updateQuestion);
  
module.exports = router;