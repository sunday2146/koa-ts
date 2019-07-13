const KoaRouter = require('koa-router');

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

    let rs = await Models.Contents.findAndCountAll({
        limit: 3,
        offset: 0,
        include: {
            model: Models.Users
        }
    });

    ctx.body = {
        code: 0,
        count: rs.count,
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

module.exports = router;