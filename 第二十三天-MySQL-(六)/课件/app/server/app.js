(async function() {

    const Koa = require('koa');
    const KoaStaticCache = require('koa-static-cache');
    const KoaBodyParser = require('koa-bodyparser');
    const router = require('./routers/main');

    const app = new Koa();

    // app.use( async (ctx, next) => {
    //     ctx.set('Access-Control-Allow-Origin','*');
    //     await next();
    // } );

    app.use( KoaStaticCache('./public', {
        prefix: 'public',
        gzip: true
    }) );

    app.use( KoaBodyParser() );

    app.use( router.routes() );

    app.listen(80);

})();