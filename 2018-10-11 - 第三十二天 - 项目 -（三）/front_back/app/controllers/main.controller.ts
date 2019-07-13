/**
 * 控制器是通过 class 来实现的
 * 但是并不是随便一个 class 他就能成为控制器
 * 类似继承的概念，koa-controllers 为我们提供了一个装饰器：Controller
 * 通过这个装饰器我们就可以把一个普通的类变成 具有 控制器特征的控制器类
 */

import { Controller, Get, Ctx, Post } from 'koa-controllers';
import {Context} from 'koa';
import db from '../models';
import { Model } from "sequelize";

@Controller
export class MainController {


    @Get('/')
    public async index( @Ctx ctx: Context ) {
        // 我们希望用户在通过get方式访问 / 的时候执行该方法，我们就可以使用
        // Get,Post装饰器来装饰该方法
        // console.log(ctx);
        ctx.body = 'hello';
    }

    @Post('/')
    public async indexPost( @Ctx ctx: Context ) {
        ctx.body = 'hello post - zMouse';
    }

    @Get('/user')
    public async user( @Ctx ctx: Context ) {

        let userList = await (<Model<any, any>>ctx.state.db['user']).findAll();

        // let userList = await (<Model<any, any>>ctx.state.db['user']).scope('zmouse').findAll();
        ctx.body = userList;

    }

}