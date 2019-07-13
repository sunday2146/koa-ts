// /**
//  * 如果我们希望检测不必要这么复杂
//  *      - 如果我们希望某些时候，只要包含其中一些规则即可
//  *          - 通过可选 ? 来实现
//  *          - 通过 as 断言
//  *          - 通过变量转换
//  */

// interface Options {
//     width: number,
//     height: number,
//     color: string
// }

// function fn(opts: Options) {}

// // 告知ts检测，我传入的就是一个Options
// // fn({
// //     height: 200,
// //     width: 100
// // } as Options);

// // 先赋值给一个变量，也可以绕开 检测
// // let obj = {
// //     height: 200,
// //     width: 100,
// //     color: 'red',
// //     a: 1
// // }
// // fn( obj );