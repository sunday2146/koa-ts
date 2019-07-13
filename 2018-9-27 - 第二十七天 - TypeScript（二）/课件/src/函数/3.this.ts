/**
 * ts中默认情况下函数中的this默认指向 ： any
 */

let obj = {
    a: 10,
    fn() {
        // 因为默认情况下，this是any类型，any类型ts不能提示有任何属性方法
        // let document:any;
        // any的值，ts不能提示或者进行类型属性检测
        // console.log(this.b);

        // 使用noImplicitThis选项可以取消默认this的any来这个设置
        // this.a
    }
}

// obj.fn();


// ts会自动推导事件函数中的this
// document.onclick = function() {
//     this
// }


let obj1 = {
    a: 1,
    fn(this: Element|Document) {    // 在ts中函数的第一个this参数是用来设置this类型约束的
        // 这个this是一个假参数，运行过程中是不存在，是给ts检测使用的
        // console.log(this);
        // 希望ts是按照事件函数中的this去做检测
        this;   //检测检测检测

        // this
    }
};

document.onclick = obj1.fn;
document.body.onclick = obj1.fn;

// function fn10(x: number) {

// }

// fn10( document.querySelector('input').value );