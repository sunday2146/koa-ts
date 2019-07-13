// 获取input中输入的内容
let input: HTMLInputElement = document.querySelector('.val');
let btn: HTMLButtonElement = document.querySelector('button');

btn.onclick = function() {
    let value: number = Number(input.value) + 10;
    console.log(value);
}