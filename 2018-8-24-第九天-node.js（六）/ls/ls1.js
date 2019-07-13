/**
 * ls
 *  输出当前运行命令所在的目录下的文件和文件夹
 * ls -p d:\
 *  我们还可以指定要显示的目录
 */

// 加载commander模块
const commander = require('commander');
// 加载fs模块
const fs = require('fs');

// 设置当前命令工具的版本
commander.version('v1.0.0', '-v, --version');

// 设置命令选项
commander.option('-p, --path [path]', '设置要显示的目录', __dirname);

// commander.path = undefined;

// 以列表的形式显示，如果选项不接收用户输入的值，那么这个选项将以boolean的形式提供给后面命令使用
commander.option('-l, --list', '以列表的形式显示');

// 实现命令的具体逻辑
commander.action( () => {

    // option中的变量会挂在到当前commander对象的同名属性下
    // console.log(commander.list);

    try {
        const files = fs.readdirSync( commander.path );
        //console.log( files );

        if ( commander.list ) {
            // 如果commander.list为true，以列表的形式显示

            // 通过map生成要显示的数据
            let output = files.map( file => {

                // 文件的扩展信息（除了文件内容以外的信息）
                let stat = fs.statSync( commander.path + '/' + file );
                // console.log(stat.isDirectory());
                // 根据isDirectory()显示不同的文件类型
                let type = stat.isDirectory() ? '目录' : '文件';

                return `[${type}] ${file}\r\n`;

            } ).join('');

            console.log(output);
        } else {
            console.log( files );
        }

    } catch(e) {
        // 开发过程中，可以把错误打印出来，实际发布以后应该屏蔽错误信息
        console.log(e);
    }
} );

commander.parse( process.argv );