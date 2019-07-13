// 原生 jq => 原生js不能和jq混用

// $('div').css('color', 'red');
// document.querySelector('div').css();    //不能这么用，不能说这个混用

// $('div')[0].style.color = 'red';    //这个写法有问题吗？
// $('div').style.color = 'red';

// 不同类型的数据有不同的操作方法，某个数据是否可以做个某个操作，要看这个（类型）数据
// 是否具备这个操作

// 某个数据后面能调用什么，要看前面的数据是什么类型
// 'miaov'.substring()

// 'miaov'.split('').reverse().join('').repeat(2);

// $('div')[0].style.color = 'red';

// jq => {

// }

// function $() {
//     let elements = document.querySelectorAll('*');
//     let obj = {};
//     for (var i=0; i<elements.length; i++) {
//         console.log(i);
//         obj[i] = elements[i];
//     }
//     return obj;
// }

// $()[0].style.color


let div = document.querySelector('div');
// 如果页面中不存在div，可能就会有问题了，但是js并不会提醒你，这个问题会比较隐形，
// 需要你有足够的经验，或者把代码放到浏览器中运行
div.style.color = 'red';

// let a = 0;
// let b = '';

