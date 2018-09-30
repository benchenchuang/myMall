const router = require('koa-router')({
    prefix:'/api'
});
const multer=require('koa-multer');
const Token=require('../middlewares/token');

const Users=require('./api/users');
const Questions=require('./api/questions');
const Banners=require('./api/banner');
const Sorts=require('./api/sort');
const Shops=require('./api/shops');
const getWeb=require('./api/web');

//上传文件配置
let storage=multer.diskStorage({
    //文件保存路径
    destination:(req,file,cb)=>{
        cb(null,'public/upload/')
    },
    //修改文件名字
    filename:(req,file,cb)=>{
        let fileFormata=(file.originalname).split('.');
        cb(null,Date.now()+'.'+fileFormata[fileFormata.length-1]);
    }
});
//加载配置
let upload=multer({storage:storage});

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

//获取banners列表
router.get('/banners',Banners.getBannerList);
//获取在线banners列表
router.get('/banner_online',Banners.getBannerOnLine);
//获取banner详情
router.get('/banner_detail',Banners.findBannerById);
//添加banner 更新banner
router.post('/add_banner',Banners.addBanner);
//更新banner状态
router.post('/update_banner_status',Banners.updateBannerStatus)
//删除banner
router.post('/del_banner',Banners.delBanner);

//获取sorts列表
router.get('/get_sorts',Sorts.getSortList);
//删除sort
router.post('/del_sort',Sorts.delSort);
//获取sort详情
router.get('/sort_detail',Sorts.findSortById);
//添加/更新sort
router.post('/add_sort',Sorts.addSort);

//获取products列表
router.get('/products',Shops.getProducts);
//添加product
router.post('/add_product',Shops.addProduct);
//删除product
router.post('/del_product',Shops.delProduct);
//获取product详情
router.get('/product',Shops.getProductDetail);

//获取首页页面内容
router.get('/home',getWeb.webHome);
//商品收藏功能
router.post('/collect/shop',Token.checkToken,getWeb.collectShop);
//商品收藏取消
router.post('/cancel/shop',Token.checkToken,getWeb.cancelShop);
//添加购物车
router.post('/cart/add',Token.checkToken,getWeb.addCart);
//获取购物车列表
router.get('/carts',Token.checkToken,getWeb.getCarts);
//购物车删除
router.post('/cart/del',Token.checkToken,getWeb.delCart);
//获取用户信息
router.get('/user/info',Token.checkToken,getWeb.findUserById);
//获取用户收藏商品列表
router.get('/collects',Token.checkToken,getWeb.getCollects);
//获取用户地址列表
router.get('/address/list',Token.checkToken,getWeb.getAddressList);
//获取地址详情
router.get('/address/detail',Token.checkToken,getWeb.detailAddress);
//删除地址
router.post('/address/delete',Token.checkToken,getWeb.delAddress);
//提交地址
router.post('/address/add',Token.checkToken,getWeb.addAddress);


//上传文件
router.post('/upload',upload.fields([{ name: 'file', maxCount:9 }]),async(ctx,next)=>{
    try{
        let files=ctx.req.files.file;
        let getFiles=[];
        for(let file of files){
            getFiles.push(file.filename);
        };
        return ctx.body={
            status:2,
            data:getFiles
        }
    }catch(e){
        return ctx.body={
            status:1,
            data:'上传失败'
        }
    }
});
  
module.exports = router;