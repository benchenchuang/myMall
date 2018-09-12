const router = require('koa-router')({
  prefix:'/admin'
});
const Admin=require('./admin/index');

//后台-首页
router.get('/',Admin.getIndex);
//后台-登录
router.get('/login',Admin.getLogin);
//后台-退出
router.get('/out',Admin.loginOut);
//后台-用户列表
router.get('/users',Admin.getUsers);
//后台-问题
router.get('/questions',Admin.getQestion);
//后台banner
router.get('/banners',Admin.getBanners);
//banner详情
router.get('/banner_detail',Admin.getBannerDetail);
//后台sort
router.get('/sorts',Admin.getSorts);


router.get('/*',async(ctx,next)=>{
  await ctx.render('error', {
    title: '404 page'
  });
})

module.exports = router;
