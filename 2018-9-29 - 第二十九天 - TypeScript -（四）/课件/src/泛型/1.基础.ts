/**
 * x 只能是数字类型，如果需要接收任意类型的参数，那么需要使用any，或者函数重载
 * @param x 
 */
// function fn(x: number): number {
//     return x * 10;
// }

// fn(10);
// fn('10');



/**
 * 泛型
 *  很多时候，类型是写死的，这样就不利于复用
 * 
 *  这样，我们就需要给类型这种值也可以设置变量
 *  <类型变量名>，一般系统使用单字母大写，比如 T,E...
 *  写在函数名，参数列表之间，这是函数的
 */
// function fn<T>(x: T): number {
//     return Number(x) * 10;
// }

//fn(1);  //在调用fn函数的时候，同时给T赋值number
// fn<number>(1);

// fn<string>(1);  //有问题的

// function fn(x) {
//     return x * 10;
// }

// let a = fn(1);
// let b = fn(2);


// function fn(...args) {
//     let arr: number[] = [];
//     for (let i=0; i<args.length; i++) {
//         arr[i] = args[i];
//     }
//     return arr;
// }

// let arr2 = fn('a', 'b', 'c');




// function fn<T, S>(arg1: T, arg2: S): [T,S]{
//     return [arg1, arg2];
// }

// let a = fn<string, number>('a', 1);



// function fn<T>(arg: T[]): T[]{
//     return arg;
// }

// fn<string>( ['1','2'] );
// fn<string>( [1,2] );

// let arr: number[] = [];
// let arr2: Array<number> = [];