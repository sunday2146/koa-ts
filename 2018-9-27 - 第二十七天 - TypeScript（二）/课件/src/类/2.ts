// class Person {

//     username: string = 'Kimoo';
//     // private age: number = 10;

//     private _age: number = 10;

//     // getAge(): number {
//     //     return this.age;
//     // }

//     // setAge(age: number): void {
//     //     if (age > 0 && age < 150) {
//     //         this.age = age;
//     //     }
//     // }

//     // 存取器，这个a并不会作为方法，而是属性去访问
//     get age(): number {
//         return this._age;
//     }

//     set age(age: number) {
//         if (age > 0 && age < 150) {
//             this._age = age;
//         }
//     }

// }

// let p1: Person = new Person();

// /**
//  * 允许在外部获取和修改age的值，但是不希望该修改成非法的，比如1000岁
//  */
// // p1.age = 1100;

// // console.log(p1);

// // p1.setAge(20);
// // p1.setAge(200);
// // console.log(p1.getAge());

// console.log( p1.a );