// /**
//  * 希望规则是：一组由数字进行key命名的对象
//  * 我们可以使用索引签名
//  *  为数据定义一组具有某种特性的key的数据
//  *  索引key的类型只能是 number 和 string 两种
//  */

// // interface Options {
// //     // key 是number，value是any类型的数据
// //     [attr: number]: any,
// //     length: number
// // }

// // function fn(opt: Options) {}

// // fn({
// //     0: 100,
// //     1: 100,
// //     2: 2000,
// //     length: 1
// // });



// interface Options {
//     // 索引签名的key课是number，也可以是string
//     [attr: string]: any,
//     length: number
// }

// function fn(opt: Options) {}

// fn({
//     a: 1,
//     b: 2,
//     length: 100
// });