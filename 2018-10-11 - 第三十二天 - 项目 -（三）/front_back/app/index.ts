// import koa from 'koa'

// import Koa = require('koa');

import * as Koa from 'koa';
import { useControllers } from "koa-controllers";
import db from './models';

// console.log(db);

let app = new Koa();

app.use( async (ctx: Koa.Context, next) => {

    // 把db对象等其他一些数据挂在到当前的state下面
    ctx.state.db = db;

    await next();
} );

useControllers(app, __dirname + '/controllers/**/*.controller.js', {
    multipart: {
        dest: './uploads'
    }
});

app.listen(8888);