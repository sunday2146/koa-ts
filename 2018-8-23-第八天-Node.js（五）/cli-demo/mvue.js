const commander = require('commander');
const fs = require('fs');

commander.version('v1.0.0', '-v, --version');

commander.option('-n, --name [val]', '设置名称', '');

commander.command('create <app-name>')
.description('创建项目')
.alias('c')
.usage('使用说明')
.action( appName => {
    // console.log(appName);

    // fs.mkdirSync(appName);
});

commander.action(() => {
    console.log('Hello ' + commander.name);
});

// 解析来自process.argv上的数据，会自动帮助我们添加一个 -h 的解析
commander.parse( process.argv );

// console.log( commander.name );
