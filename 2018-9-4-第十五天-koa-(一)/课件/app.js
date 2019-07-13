const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const Router = require('koa-router');
const Swig = require('koa-swig');
const co = require('co');

const app = new Koa();

let users = [
    {username: 'mt'},
    {username: 'reci'},
    {username: 'kimoo'},
    {username: 'zMouse'}
];

app.use( koaStaticCache( __dirname + '/static', {
    prefix: '/public',
} ) );

const router = new Router();

const render = Swig({
    root: __dirname + '/views',
    autoescape: true,
    cache: false,
    ext: '.html'
});
app.context.render = co.wrap( render );

router.get('/list', async (ctx, next) => {


    ctx.body = await ctx.render('list.html', {
        users
    });


    //ctx.body = '首页';

    // ctx.body = `
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <title>Document</title>
    // </head>
    // <body>
    //     // 这样的写法太恶心
    // </body>
    // </html>
    // `
});

app.use( router.routes() );

// 监听当前机器的地址，端口
app.listen(80);