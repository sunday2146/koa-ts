const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const Router = require('koa-router');
const Swig = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

/**
 * 处理静态文件
 */
app.use( koaStaticCache('./static', {
    prefix: '/static',
    gzip: true
}) );

/**
 * 处理请求正文中的数据
 */
app.use( bodyParser({

}) );

const router = new Router();

/**
 * 存储所有的任务数据
 *  当前这个数据是存储在服务器运行中的内存中
 */
let datas = {
    maxId: 3,
    appName: 'TodoList',
    skin: 'index.css',
    tasks: [
        {id: 1, title: '测试任务一', done: true},
        {id: 2, title: '学习koa', done: false},
        {id: 3, title: '学习sequelize', done: false}
    ]
};

/**
 * 设置模板引擎
 */
app.context.render = co.wrap( Swig({
    root: __dirname + '/views',
    autoescape: true,   //是否html编码，为了安全起见，一般不开启该功能，设置为true
    cache: false,
    // cache: 'memory', //memory : 把解析后的结果保存在内存中，比如每次访问都去解析模板，一般用于线上生成环境
    ext: 'html'
}) );

/**
 * 首页，用于展示任务清单
 */
router.get('/', async ctx => {
    // ctx.body = '/';

    ctx.body = await ctx.render('index.html', {
        datas
    });

});


/**
 * 添加，添加新的任务，用来展示添加任务的页面
 */
router.get('/add', async ctx => {
    ctx.body = await ctx.render('add.html', {
        datas
    });
});

/**
 * 添加，处理通过添加页面提交的数据
 */
// router.get('/posttask', async ctx => {

//     let title = ctx.query.title;

//     ctx.body = '接收提交的新任务：' + title;
// });

/**
 * 添加，处理通过添加页面提交的数据
 * post方式
 */
router.post('/posttask', async ctx => {

    // querystring与当前请求的方式是没有关系的，无论是get还是post，querystring一样
    // 都可以传递数据，querystring与get没有任何一毛钱的关系

    // get 方式请求不能操作正文
    // let title_1 = ctx.query.title;
    let title = ctx.request.body.title || '';

    // console.log(title_1);

    // ctx.body = '接收提交的新任务：' + title;

    if (!title) {
        ctx.body = await ctx.render('message', {
            msg: '请输入任务标题',
            href: 'javascript:history.back();'
        });
        return;
    }

    datas.tasks.push({
        id: ++datas.maxId,
        title: ctx.request.body.title,
        done: false
    });

    ctx.body = await ctx.render('message', {
        msg: '添加成功',
        href: '/'
    });
});


/**
 * 改变，修改任务的状态
 */
router.get('/change/:id', async ctx => {
    // ctx.body = '/change/' + ctx.params.id;

    let id = ctx.params.id;

    // console.log(id)

    datas.tasks.forEach( task => {
        if (task.id == id) {
            task.done = !task.done;
        }
    } );

    // ctx.body = '';

    ctx.response.redirect('/');
});

/**
 * 删除任务
 */
router.get('/remove/:id', async ctx => {
    let id = ctx.params.id;

    datas.tasks = datas.tasks.filter( task => task.id != id );

    ctx.body = await ctx.render('message', {
        msg: '删除成功',
        href: '/'
    });
});

app.use( router.routes() );

app.listen(80);