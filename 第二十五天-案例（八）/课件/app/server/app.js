(async function() {

    const Koa = require('koa');
    const KoaStaticCache = require('koa-static-cache');
    const KoaBodyParser = require('koa-bodyparser');
    const router = require('./routers/main');
    const Session = require('koa-session');

    const app = new Koa();

    // app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

    app.keys = ['miaov'];

    app.use( Session({
        key: 'koa:sess',
        maxAge: 86400000,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false
    }, app) );

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