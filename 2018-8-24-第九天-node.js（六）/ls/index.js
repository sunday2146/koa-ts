/**
 * ls
 *  输出当前运行命令所在的目录下的文件和文件夹
 * ls d:\
 *  我们还可以指定要显示的目录
 */

// 加载commander模块
const commander = require('commander');
// 加载fs模块
const fs = require('fs');

// 设置当前命令工具的版本
commander.version('v1.0.0', '-v, --version');

//
const subCommander = commander.command('<path>');

subCommander.option('-n, --name', '设置名字');

// 实现命令的具体逻辑
commander.action( (path) => {   //这里的path参数就是在命令中定义的<path>
    // console.log('ls', path);

    // 把当前命令指定的目录下的文件以及文件夹全部显示在控制台中

    try {
        const files = fs.readdirSync( path );
        console.log( files );
    } catch(e) {
        // 开发过程中，可以把错误打印出来，实际发布以后应该屏蔽错误信息
        console.log(e);
    }
} );

// 在把process.argv交给parse解析之前进行一个简单的处理，少于3个参数，表示使用的是默认值
if (process.argv.length < 3) {
    process.argv.push(__dirname);
}
// console.log(process.argv);

commander.parse( process.argv );