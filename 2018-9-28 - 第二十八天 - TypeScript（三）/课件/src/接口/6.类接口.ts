/**
 * 类接口
 *      使用接口让某个类去符合某种契约
 * 
 * 类可以通过 implements 关键字去实现某个接口
 *      - implements 某个接口的类必须实现这个接口中确定所有的内容
 *      - 一个类只能有一个父类，但是可以implements多个接口，多个接口使用逗号分隔
 */

interface ISuper {
    fly(): void;
}

class Man {

    constructor(public name: string) {
    }

}

class SuperMan extends Man implements ISuper {

    fly() {
        console.log('起飞');
    }

}

class Cat {

}

class SuperCat extends Cat implements ISuper {
    fly() {
        console.log('起飞');
    }
}

let kimoo = new SuperMan('Kimoo');
// kimoo