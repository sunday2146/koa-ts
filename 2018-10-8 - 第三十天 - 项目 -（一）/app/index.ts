// import koa from 'koa'

// import Koa = require('koa');

import * as Koa from 'koa';

let app = new Koa();

app.use( async ctx => {
    ctx.body = 'hello miaov@@@@';
} );

app.listen(8888);