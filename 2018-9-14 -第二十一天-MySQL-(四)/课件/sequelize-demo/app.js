(async function() {

    /**
     * ORM
     *  对象关系映射
     *  把js中的对象与数据库进行关联（映射），后期通过操作对来来操作数据库
     * 
     * sequelize依赖了mysql2，但是没有默认安装，需要手动安装mysql2
     */

    const Sequelize = require('sequelize'); //类

    /**
     * 连接数据库
     */
    const sequelize = new Sequelize('miaov', 'root', '', {
        // 其他的数据库连接配置
        // host: '127.0.0.1',
        // port: 3306,
        
        dialect: 'mysql', //使用的数据库
        timezone: 'Asia/Shanghai'    //当我们向数据库中写入时间的时候，默认会根据系统当前所在时区进行设置
    });

    // 测试：如果Promise有可能抛出的错误，那么一定要捕获错误
    try {
        sequelize.authenticate();
        console.log('连接成功');
    } catch(e) {
        console.log('连接失败');
    };

    /**
     * 数据库连接完成以后，需要确定操作的表
     * 使用orm，不需要通过sql来操作表，而是通过对象来操作
     * 给每一个要操作的表定义一个对象 - 模型 Model
     */
    const UserModel = sequelize.define('User', {
        // 描述表中对应的字段信息
        // 对象的key默认对应着表的column，字段
        id: {
            // 每一个字段的信息
            type: Sequelize.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        age: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        gender: {
            type: Sequelize.ENUM(['男', '女', '默认']),
            allowNull: false,
            defaultValue: '男'
        }
    }, {
        // 用来设置字段以外的其他信息
        timestamps: false,
        paranoid: false,
        freezeTableName: true,
        tableName: 'user',
        indexes: [
            {
                name: 'uname',
                fields: ['username']
            },
            {
                name: 'age',
                fields: ['age']
            }
        ]
    });

    /**
     * 模型类 -> 表
     * 模型创建出来的对象 -> 表中某条记录
     */
    // let Kimoo = new UserModel();    //创建了一个User的记录

    // let Kimoo = UserModel.build({
    //     // 字段对应的值
    //     username: 'Kimoo',
    //     age: 30,
    //     gender: '男'
    // });  //和上面的new是一样的

    // 通过new或者build出来的对象不会立即同步到数据库中，需要使用后续的一些方法来同步

    // console.log(Kimoo);
    // await Kimoo.save();
    // console.log(Kimoo);

    // 修改
    // let Kimoo = await UserModel.findById(1);
    // console.log(Kimoo);
    // Kimoo.set('age', 31);
    // await Kimoo.save();

    // update == set + save
    // await Kimoo.update({
    //     age: 32
    // });

    // Kimoo.destroy();


    ////////////////////
    // let Kimoo = UserModel.build({
    //     username: 'Kimoo',
    //     age: 30
    // });
    // await Kimoo.save();
    // let Reci = UserModel.build({
    //     username: 'Reci',
    //     age: 6,
    //     gender: '女'
    // });
    // await Reci.save();


    /**
     * fineOne
     */
    // let rs = await UserModel.findOne({
    //     where: {
    //         username: 'Reci'
    //     }
    // });
    // console.log(rs);



    /**
     * findAll
     */
    // let rs = await UserModel.findAll();
    // console.log(rs);
    // console.log( rs.map(r => r.get('username')) );

    // let rs = await UserModel.findAll({
    //     where: {
    //         //username: 'Reci'    // username = 'Reci'
    //         // username: {
    //             // [Sequelize.Op.eq]: 'Reci'   //和上面一致
    //         // },

    //         // age: {
    //         //     [Sequelize.Op.gte]: 30
    //         // },

    //         // 多条件
    //         [Sequelize.Op.or]: [
    //             {
    //                 age: {
    //                     [Sequelize.Op.gt]: 30
    //                 }
    //             },
    //             {
    //                 gender: '女'
    //             }
    //         ]
    //     }
    // });


    // let rs = await UserModel.findAll({
    //     limit: 2
    // });

    // let rs = await UserModel.findAll({
    //     offset: 1
    // });

    // let rs = await UserModel.findAll({
    //     offset: 2,
    //     limit: 2
    // });

    // let rs = await UserModel.findAll({
    //     order: [
    //         ['age', 'desc']
    //     ]
    // });

    // console.log( rs.map(r => r.get('username')) );

    // let rs = await UserModel.count();
    // console.log(rs);

    // let rs = await UserModel.findAndCountAll({
    //     limit: 2
    // });
    // console.log(rs);

    // let rs = await UserModel.sum('age', {
    //     where: {
    //         gender: '男'
    //     }
    // });
    // console.log(rs);















    // 关联查询
    const MessageModel = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        uid: {  // 其他的表的字段，把当前字段定义为外键
            type: Sequelize.INTEGER(10),
            defaultValue: 0,
            references: {
                model: UserModel,
                key: 'id'
            }
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: true,
            defaultValue: ''
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'message'
    });

    // 获取某条留言的所有数据：留言本身的数据+该留言的用户数据
    
    let data = {};


    // let message = await MessageModel.findById(3);
    // let user = await UserModel.findById( message.get('uid') );

    // Object.assign( data, {
    //     id: message.get('id'), 
    //     uid: message.get('uid'), 
    //     username: user.get('username'),
    //     age: user.get('age'),
    //     gender: user.get('gender'),
    //     content: message.get('content'),
    // }  );

    // console.log(data);



    // MessageModel.belongsTo(UserModel, {
    //     foreignKey: 'uid'
    // });

    // let data2 = await MessageModel.findById(1, {
    //     include: [UserModel]
    // });

    // console.log(data2);

    // console.log(`
    
    //     留言id：${data2.get('id')}
    //     留言人名称：${data2.User.username}
    //     留言内容：${data2.get('content')}
    
    // `);


    UserModel.hasMany(MessageModel, {
        foreignKey: 'uid'
    });

    let data3 = await UserModel.findById(4, {
        include: [MessageModel]
    });

    console.log(data3);

})();