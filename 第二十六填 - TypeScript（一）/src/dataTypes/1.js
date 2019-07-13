// 获取input中输入的内容
let input = document.querySelector('.val');
let btn = document.querySelector('button');

btn.onclick = function() {
    let value = input.value + 10;
    console.log(value);
}
