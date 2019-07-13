import * as Koa from 'koa';
import {Controller, Get, Ctx,} from 'koa-controllers'

console.log(1)

@Controller
export default class MainController {

    @Get('/')
    public async index( @Ctx ctx: Koa.BaseContext ) {
        ctx.body = 'Hello';
    }

    @Get('/user')
    public async user( @Ctx ctx: Koa.BaseContext ) {
        ctx.body = '用户中心'
    }

}