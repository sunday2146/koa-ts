const KoaRouter = require('koa-router');
const md5 = require('md5');
const Models = require('../models');
const Sequelize = require('sequelize');

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

    
    // ctx.cookies.set('uid', user.get('id'), {
    //     httpOnly: false
    // });

    // 服务端发送一个约定好的cookie，来表示当前是登录
    // ctx.cookies.set('uid', user.get('id'), {
    //     // httpOnly，表示当前的cookie是否允许客户端进行操作（js），如果为true，那么就表示这个cookie是能用户http协议的数据传输
    //     httpOnly: true,
    //     signed: true
    // });
    ctx.cookies.set('username', user.get('username'), {
        httpOnly: false
    });

    ctx.session.uid = 1;

    ctx.body = {
        code: 0,
        data: {
            id: user.get('id'),
            username: user.get('username')
        }
    }
});

router.post('/like', async ctx => {

    // 让客户端请求的时候带过来一个凭证
    let contentId = ctx.request.body.content_id;    //要点赞的内容id
    // let uid = ctx.request.body.uid; //当前点赞的用户

    // 根据上面的cookie确定，如果当前请求是一个登录的用户，那么头信息肯定会有当前这个登录用户id
    let uid = ctx.session.uid;

    // console.log(contentId, uid);

    if (!uid) {
        return ctx.body = {
            code: 1,
            data: '你还没有登录'
        }
    }

    // 获取当前被点赞的内容
    let content = await Models.Contents.findById(contentId);
    // console.log(content);
    if (!content) {
        return ctx.body = {
            code: 2,
            data: '没有对应的内容'
        }
    }

    // 查询当前用户是否对该内容已经点过赞了
    // SELECT * FROM likes WHERE content_id=1 and user_id=1
    let like = await Models.Likes.findOne({
        where: {
            [Sequelize.Op.and]: [
                {'content_id': contentId},
                {'user_id': uid}
            ]
        }
    });

    if (like) {
        return ctx.body = {
            code: 3,
            data: '你已经点过赞了'
        }
    }

    // 对内容的like数据进行增加
    content.set( 'like_count', content.get('like_count') + 1 );
    await content.save();
    // console.log(content);

    await Models.Likes.build({
        content_id: contentId,
        user_id: uid
    }).save();

    ctx.body = {
        code: 0,
        data: content
    }

})

module.exports = router;