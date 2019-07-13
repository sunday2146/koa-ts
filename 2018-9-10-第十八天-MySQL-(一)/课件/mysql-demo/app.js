(async function run() {

    const Koa = require('koa');
    const Static = require('koa-static-cache');
    const Router = require('koa-router');
    const Bodyparser = require('koa-bodyparser');
    const fs = require('fs');
    const mysql = require('mysql2/promise');

    const app = new Koa();

    app.use( Static('./static', {
        prefix: '/static',
        gzip: true
    }) );

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'miaov'
    });

    const router = new Router();

    // 如果觉得 /static/index.html 太丑，可以使用下面的方法
    
    app.use( Bodyparser() );

    router.get('/', ctx => {
        const content = fs.readFileSync('./static/index.html');
        ctx.body = content.toString();
    });

    router.get('/todos', async ctx => {
        // ctx.body = [
        //     {id: 1, title: '学习node', done: true},
        //     {id: 2, title: '学习koa', done: true},
        //     {id: 3, title: '学习mysql', done: false}
        // ];

        const [data] = await connection.query("SELECT id,title,done FROM todos ORDER BY done DESC");

        ctx.body = {
            code: 0,
            data
        }
    });

    router.post('/add', async ctx => {
        const  title = ctx.request.body.title || '';

        if (title == '') {
            ctx.body = {
                code: 1,
                data: 'title不能为空'
            }
            return;
        }

        // console.log("INSERT INTO todos (title, done) VALUES ('"+ title +"', 0)")

        const [rs] = await connection.query("INSERT INTO todos (title, done) VALUES ('"+ title +"', 0)");

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '添加成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '添加失败'
            }
        }
    });


    app.use( router.routes() );


    app.listen(80);

})();