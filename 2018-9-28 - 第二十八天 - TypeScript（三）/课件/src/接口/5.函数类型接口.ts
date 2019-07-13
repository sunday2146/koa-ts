/**
 * 这个接口描述的是一个包含有fn并且值的类型为函数的结构体，并不是描述函数结构
 * 而是一个包含函数的对象结构
 */
// interface Options {
//     fn: Function
// }

// let o: Options = {
//     fn: function() {}
// }



// let fn: (x: number, y: number) => number = function(x: number, y: number): number {return x + y}

/**
 * 定义一个事件函数，那么这个函数必须得有一定的规则了
 * 我们不能随便的把一个函数赋值给事件
 */
// function fn(x: MouseEvent) {
//     console.log(x.clientX);
// }

// document.onkeydown = fn;


// 我们也可以使用 interface 来约定定义函数的结构

// 定义的是函数接口
// interface IFn {
//     (x: number, y: number): number
// }


// let fn: IFn = function(x: number, y: number): number {return x + y}


// 定义了一个接受一个MouseEvent类型参数的函数结构
// interface MouseEventCallBack {
//     (e: MouseEvent): any
// }

// let fn: MouseEventCallBack = function(a: MouseEvent) {

// }

// document.onclick = fn;


// interface ResponseCallBack {
//     (rs: Response): any
// }

// function todo(callback: ResponseCallBack) {
//     callback(new Response);
// }


// todo(function(x: string) {

// });

// fetch('url').then( (a: Response) => {
//     a.json();
// } );


// interface AjaxData {
//     code: number;
//     data: any
// }
// interface AjaxCallback {
//     (rs: AjaxData): any
// }


// function ajax(callback: AjaxCallback) {
//     callback({
//         code: 1,
//         data: []
//     });
// }


// ajax( function(x: AjaxData) {
//     x.code
//     x.data

//     x.message
// } );