const router = require('koa-router')({
  prefix:'/admin'
});
const Users=require('./admin/users');

//后台-登录
router.get('/login',Users.getLogin);
//后台-退出
router.get('/out',Users.loginOut);
//后台-问题
router.get('/questions',Users.getQestion);

router.get('/*',async(ctx,next)=>{
  await ctx.render('error', {
    title: '404 page'
  });
})

module.exports = router;
