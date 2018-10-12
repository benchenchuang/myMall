
module.exports={
    getIndex:async (ctx,next)=>{
        await ctx.render('index', {
            title: 'Hello Koa 2!',
            index:1,
            user:ctx.session.user
        })
    },
    getLogin:async (ctx,next)=>{
        await ctx.render('./users/login', {
            title: '用户登录',
            index:1,
            user:ctx.session.user
        })
    },
    getUsers:async (ctx,next)=>{
        await ctx.render('./users/users',{
            title:"网站用户",
            index:9,
            user:ctx.session.user
        })
    },
    getQestion:async(ctx,next)=>{
        await ctx.render('./users/questions',{
            title:'密码问题',
            index:10,
            user:ctx.session.user
        })
    },
    getBanners:async(ctx,next)=>{
        await ctx.render('./banner/index',{
            title:'网站轮播图',
            index:8,
            user:ctx.session.user
        })
    },
    getBannerDetail:async(ctx,next)=>{
        await ctx.render('./banner/desc',{
            title:'轮播图详情',
            index:8,
            user:ctx.session.user
        })
    },
    getSorts:async(ctx,next)=>{
        await ctx.render('./sort/index',{
            title:'商品分类',
            index:7,
            user:ctx.session.user
        })
    },
    getShops:async(ctx,next)=>{
        await ctx.render('./product/index',{
            title:'商品列表',
            index:6,
            user:ctx.session.user
        })
    },
    addShop:async(ctx,next)=>{
        await ctx.render('./product/add',{
            title:'商品详情',
            index:6,
            user:ctx.session.user
        })
    },
    getOrders:async (ctx,next)=>{
        await ctx.render('./orders/index',{
            title:'订单列表',
            index:5,
            user:ctx.session.user
        });
    },
    orderDetail:async (ctx,next)=>{
        await ctx.render('./orders/detail',{
            title:'订单详情',
            index:5,
            user:ctx.session.user
        });
    },
    loginOut:async(ctx,next)=>{
        ctx.session.user='';
        ctx.session.token='';
        return ctx.redirect('./login')
    }
}