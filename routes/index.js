const router = require('koa-router')({
  prefix:'/admin'
});
const Users=require('./users/index');

router.get('/',Users.getIndex);

router.get('/*',async(ctx,next)=>{
  await ctx.render('error', {
    title: '404 page'
  });
})

module.exports = router;
