const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const Router = require('koa-router');

const app = new Koa();

app.use( koaStaticCache( __dirname + '/static', {
    prefix: '/public',
} ) );

// app.use( (ctx, next) => {


//     // 下面的代码其实也是一种路由，只是特别的简单，还需要处理很多其他一些问题
//     // 所以我们就使用一些已有的模板

//     // console.log(ctx.URL);
//     // switch(ctx.URL) {
//     //     case '/user':
//     //         break;
//     //     //....
//     // }
// } );


const router = new Router();

// 通过 get 方式 发送 / 请求 => get http://127.0.0.1/
router.get('/', (ctx, next) => {
    ctx.body = '首页';
});


// 子路由
const userRouter = new Router();

userRouter.get('/', (ctx, nect) => {
    ctx.body = '用户首页'
});
userRouter.get('/address', (ctx, nect) => {
    ctx.body = '用户收货地址'
});

router.use('/user', userRouter.routes());

// 子路由
const itemRouter = new Router({
    prefix: '/item'
});
itemRouter.get('/add', (ctx, nect) => {
    ctx.body = '添加物品';
});


// 子路由
const goodsRouter = new Router();
goodsRouter.get('/goods/:id', (ctx, nect) => {
    //        /list/1?order=desc
    console.log( Router.url('/list', {page:1}, {query: {order:'desc'}}) );
    ctx.body = '添加物品：' + ctx.params.id;
});

// router.redirect('/admin', '/user', 301);

// 把路由对象挂载到app对象中
app.use( router.routes() );
app.use( itemRouter.routes() );
app.use( goodsRouter.routes() );

// 监听当前机器的地址，端口
app.listen(80);