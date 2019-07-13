const Koa = require('koa'); //http，包装过的http

// 创建一个http服务器，监听请求，http.createServer()
const app = new Koa();

// 注册中间件函数  webpack -> 读取文件,   loader，plugin   ,打包并生成文件

// next : 中间件函数 -> 迭代器

// app.use( (ctx, next) => {
//     // ctx：koa处理过的对象
//     console.log(1);
//     ctx.body = '<strong>Hello';

//     next();

//     // 判断当前用户是否有权限，如果有权限，再调用next()
// } );

// app.use(async (ctx, next) => {
//     // ctx：koa处理过的对象
//     console.log(2);
//     ctx.body += ' Koa</strong>';

//     // await db.findOne();
// } );




app.use((ctx, next) => {

    // throw new Error();

    // let n = Math.random();

    // 不推荐
    // ctx.n = n;
    // ctx.state.n = n;

    // ctx.throw(404, '页面没了', {a: 1});

    // console.log(ctx.request);

    next();

});

app.use((ctx, next) => {

    // throw new Error();

    // console.log(ctx.n);
    // console.log(ctx.state.n);
    

    // next();

    ctx.response.body = {a: 1, b: 2};
    // ctx.body = {a: 1, y: 2}; ctx.body => ctx.response.body

    // ctx.attachment('a.txt');

});

app.on('error', (err, ctx) => {
    console.log('错了', err);
});

// 监听当前机器的地址，端口
app.listen(80);