const router = require('koa-router')({
  prefix:'/admin'
});
const Admin=require('./admin/index');
const Token=require('../middlewares/token');

//后台-首页
router.get('/',Token.adminCheck,Admin.getIndex);
//后台-登录
router.get('/login',Admin.getLogin);
//后台-退出
router.get('/out',Admin.loginOut);
//后台-用户列表
router.get('/users',Token.adminCheck,Admin.getUsers);
//后台-问题
router.get('/questions',Token.adminCheck,Admin.getQestion);
//后台banner
router.get('/banners',Token.adminCheck,Admin.getBanners);
//banner详情
router.get('/banner_detail',Token.adminCheck,Admin.getBannerDetail);
//后台sort
router.get('/sorts',Token.adminCheck,Admin.getSorts);
//后台products
router.get('/products',Token.adminCheck,Admin.getShops);
//商品详情/添加商品
router.get('/add_product',Token.adminCheck,Admin.addShop);


router.get('/*',async(ctx,next)=>{
  await ctx.render('error', {
    title: '404 page'
  });
})

module.exports = router;
