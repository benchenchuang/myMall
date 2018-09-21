const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const session =require('koa-session');
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger');
const cors = require('koa-cors');

const index = require('./routes/index');
const api = require('./routes/api');

// error handler
onerror(app)
app.keys=['mall'];
const setConfig={
  key:'token',
  maxAge:86400000,
  overwrite: true, 
  httpOnly: true,
  signed: true, 
  rolling: false,
}

app.use(session(setConfig,app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  'formLimit':'5mb',
  'jsonLimit':'5mb',
  'textLimit':'5mb',
}))


app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3636');
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(cors());
app.use(index.routes(), index.allowedMethods());
app.use(api.routes(), api.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
