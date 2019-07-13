const commander = require('commander');

const subCommand = commander.command('create <a> <b> <c>');

// 在action的回调函数的参数列表中就是command定义的参数
// option就是一个参数（选项） option('-p, --path <path>')
subCommand.action( (v1, v2, v3) => {
    console.log(v1, v2, v3);
});

commander.parse(process.argv);