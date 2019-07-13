const KoaRouter = require('koa-router');
const md5 = require('md5');
const Models = require('../models');

const router = new KoaRouter();

router.get('/', async ctx => {
    // 操作数据库
    // DOM => Document Object Model 文档对象模型
    // 文档：如html，html的内容本身是一组字符串，通过字符串的操作去修改html的内容，会特别的麻烦
    // 为了能够更方便的操作html这样的字符串，js先把这种结构字符串转成对象，然后通过
    // 操作对象来映射到对应的html上面
    // ORM => 和DOM的概念和相似，像操作对象的一样的操作数据库

    // let data = await Models.Users.findById(1, {
    //     include: {
    //         model: Models.Comments
    //     }
    // });

    // 获取queryString传过来的数据
    let page = ctx.query.page || 1;
    let prepage = ctx.query.prepage || 2;
    let offset = (page - 1) * prepage;

    let rs = await Models.Contents.findAndCountAll({
        limit: 2,
        offset,
        include: {
            model: Models.Users
        }
    });

    ctx.body = {
        code: 0,
        count: rs.count,
        prepage,
        data: rs.rows.map( d => {
            return {
                id: d.id,
                title: d.title,
                content: d.content,
                user_id: d.user_id,
                username: d.User.username,
                created_at: d.createdAt,
                like_count: d.like_count,
                comment_count: d.comment_count
            }
        } )
    };
});

router.post('/register', async ctx => {

    // console.log(ctx.request.body);
    let username = ctx.request.body.username.trim();
    let password = ctx.request.body.password.trim();
    let repassword = ctx.request.body.repassword.trim();

    if (username=='' || password == '' || repassword == '') {
        return ctx.body = {
            code: 1,
            data: '用户名或密码不能为空'
        }
    }
    if (password != repassword) {
        return ctx.body = {
            code: 2,
            data: '两次输入的密码不一致'
        }
    }

    let user = await Models.Users.findOne({
        where: {
            username
        }
    });

    if (user !== null) {
        return ctx.body = {
            code: 3,
            data: '当前用户已经被注册了'
        }
    }

    let newUser = await Models.Users.build({
        username,
        password: md5(password)
    }).save();

    ctx.body = {
        code: 0,
        data: {
            id: newUser.get('id'),
            username: newUser.get('username')
        }
    }

});

router.post('/login', async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    let user = await Models.Users.findOne({
        where: {
            username
        }
    });

    if (user === null) {
        return ctx.body = {
            code: 1,
            data: '不存在该用户'
        }
    }

    if (user.get('password') !== md5(password)) {
        return ctx.body = {
            code: 1,
            data: '密码错误'
        }
    }

    
    ctx.cookies.set('uid', user.get('id'), {
        httpOnly: false,
        signed: true
    });

    ctx.body = {
        code: 0,
        data: {
            id: user.get('id'),
            username: user.get('username')
        }
    }
});

// router.post('/like', async ctx => {

//     // 让客户端请求的时候带过来一个凭证
    

// })

module.exports = router;