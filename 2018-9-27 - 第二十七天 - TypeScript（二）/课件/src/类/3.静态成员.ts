// /**
//  * 单例
//  */

// // class Mysql {

// //     host: string;
// //     port: number;
// //     username: string;
// //     password: string;
// //     dbname: string;

// //     constructor(host = '127.0.0.1', port = 3306, username='root', password='', dbname='') {
// //         this.host = host;
// //         this.port = port;
// //         this.username = username;
// //         this.password = password;
// //         this.dbname = dbname;
// //     }

// //     query() {}
// //     insert() {}
// //     update() {}

// // }

// /**
//  * 创建一个Mysql对象，通过这个对象来操作数据库
//  * 如果我们不加以限制的话，这个Mysql是可以new出来多个对象的
//  * 每一个Mysql都会占用资源（内存）
//  */
// // let db = new Mysql();
// // db.query();
// // db.insert();

// // let db1 = new Mysql();
// // db1.query();
// // db1.insert();




// /**
//  * 通过某种方法控制系统同时只有一个Mysql的对象在工作
//  * 通过口头去约定是不靠谱的
//  */

// class Mysql {

//     // 静态属性，不需要通过new出来的对象方面，直接是通过Mysql类来访问
//     public static instance;

//     host: string;
//     port: number;
//     username: string;
//     password: string;
//     dbname: string;

//     private constructor(host = '127.0.0.1', port = 3306, username='root', password='', dbname='') {
//         this.host = host;
//         this.port = port;
//         this.username = username;
//         this.password = password;
//         this.dbname = dbname;
//     }

//     public static getInstance() {
//         if (!Mysql.instance) {
//             Mysql.instance = new Mysql();
//         }
//         return Mysql.instance;
//     }

//     query() {}
//     insert() {}
//     update() {}

// }


// // let db = new Mysql();

// // console.log(Mysql.instance);

// let db = Mysql.getInstance();
// db.query();
// db.insert();