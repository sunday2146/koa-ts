// let a:undefined;

// a = undefined;

// 下面是可以的，可以把null赋值给其他类型，但是不能把其他类型的数据赋值给null
// let a: number;
// a = null;

// let b: any;
// b = 1;

// 类型推导
// let c = 1;  //ts会自动推导，a是number类型的
// c = 'm';

// document.onkeydown = function(e) {    //事件函数的第一个参数，是根据当前绑定的事件类自动推导的
// }

// let fn: (a: number, b: string) => string = function(a: number, b: string): string {return a + b};