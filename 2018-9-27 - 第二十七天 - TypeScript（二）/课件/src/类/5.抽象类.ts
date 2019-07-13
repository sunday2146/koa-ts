abstract class Person { //抽象类不能实例化的
    username: string;

    constructor(username: string) {
        this.username = username;
    }

    say() {
        console.log('哈哈哈哈哈');
    }

    // 虽然子类都会有这样的特性，学习，但是子类学习具体过程不一样，所在在父类确定
    // 不了study方法的具体实现，父类只能有抽象约定，接收什么参数，返回什么内容
    // 如果一个类中有抽象的方法了，那么这个类也必须是抽象的
    abstract study(): void   //抽象方面是没有具体代码的
}


class Student extends Person {

    study() {
        console.log('学生有学生的学习方法 - 需要老师教授');
    }

}

class Teacher extends Person {

    study() {
        console.log('自学');
    }

}

// 如果一个类继承了抽象的父类，就必须实现所有抽象方面，否则这个子类还是必须得为抽象的
// abstract class P extends Person {

// }


// new Person();
