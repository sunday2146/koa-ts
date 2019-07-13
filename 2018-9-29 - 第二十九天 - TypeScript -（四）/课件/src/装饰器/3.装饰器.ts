// function Age<T extends {new(...args: any[]): {}}>(constructor: T): T {
//     class Person2 extends constructor {
//         age: number = 0;
//     }
//     return Person2;
// }

// 我希望装饰出来的age属性的值不是固定的
// 装饰器函数不是我们主动调用的
// 如果我们希望传入构造值，那么就得使用 ： 闭包
// Age就不能直接作为装饰器函数
// 该函数执行完成以后需要返回一个函数，这个返回的函数将作为实际的装饰器函数
function Age(v: number) {
    // 这个返回的函数才是真正的装饰器要执行的函数
    return function<T extends {new(...args: any[]): {}}>(constructor: T): T {
        class Person2 extends constructor {
            age: number = v;
        }
        return Person2;
    }
}

@Age(10)
class Person {

    username = 'Kimoo'

}

@Age(20)
class Cat {

    username = '小猫咪'

}

let p1 = new Person();
console.log(p1);

let c1 = new Cat();
console.log(c1);




// function fn(e, a, b) {
//     return a + b + e.clientX;
// }

// document.onclick = function(e) {
//     fn(e, 10, 29)
// };


// @Component
// class Main {

// }