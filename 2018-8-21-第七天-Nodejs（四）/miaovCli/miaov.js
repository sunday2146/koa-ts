/**
 * usage : node miaov app -i
 *  miaov : 我们的脚本文件
 *  app : 要生成的项目的名称
 *  -i : 参数，表示要同时产生index.html文件
 */

const fs = require('fs');

// 获取用户要生成的项目名称，process
// console.log(process.argv);

let appName = process.argv[2];

// 根据项目名称生成指定的目录
let appRoot = __dirname + '/' + appName;

// console.log(appRoot);
if ( fs.existsSync(appRoot) ) {
    console.log('项目已经存在了，请勿重复创建！');
    process.exit();
}


fs.mkdirSync( appRoot );
fs.mkdirSync( appRoot + '/images' );
fs.mkdirSync( appRoot + '/css' );
fs.mkdirSync( appRoot + '/js' );

// 判断是否存在 -i 的选项
if ( process.argv.includes('-i') ) {
    fs.writeFileSync(appRoot + '/index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>App</title>
</head>
<body>
    <h1>App</h1>
</body>
</html>
    `);
}

console.log('项目创建完成！');

// process.stdout.cursorTo(0,0);
// process.stdout.write('() aaaa \r\n');
// process.stdout.write('(+) bbbb \r\n');
// process.stdout.write('() cccc \r\n');