const fs = require('fs');

// write

// 写入数据到文件
// fs.writeFile(file, data[, options], callback)

// input/output => i/o 操作 => 流 二进制 => buffer
// 数据（字符串，音频，视频，二进制） => buffer => stream
// 如果文件不存在，则创建
// 如果目录不存在，创建文件就会失败
// First Error : node中一种约定，如果一个回调可能有错误发生，那么约定回调函数的第一个参数专门用来提供错误对象。
// fs.writeFile('./1.txt', 'Miaov', (err) => {
//     // console.log(err);
//     // console.log('文件写入成功');

//     if (err) {
//         console.log('写入失败');
//     } else {
//         console.log('写入成功');
//     }
// });

// let res = fs.writeFileSync('G:/aaa/1.txt', 'Miaov');
// console.log(res);

// try {
//     // fs.writeFileSync('G:/aaa/1.txt', 'Miaov');
//     fs.writeFileSync('./1.txt', 'Miaov');
//     console.log('写入成功');
// } catch(e) {
//     console.log('写入失败');
// }

// 追加内容 
// fs.appendFileSync('./1.txt', '我是追加的内容');

//let content = fs.readFileSync('./1.txt');
//console.log(content);

// 获取文件其他信息
// let info = fs.statSync('./1.txt');
// console.log(info);
// console.log(info.isFile());

// 删除文件
// fs.unlinkSync('./1.txt');


// 文件夹

// 创建，不会进行递归创建
// fs.mkdirSync('./a/b/c');
// fs.mkdirSync('./a');

// 不能非空文件夹
// fs.rmdirSync('./a');

// let dirPath = './a';

// let files = fs.readdirSync(dirPath);
// // console.log(files);
// files.forEach( child => {
//     // 删除每一个子文件
//     fs.unlinkSync(dirPath + '/' + child);
// } );
// fs.rmdirSync(dirPath);

rmdir('./a');

// 递归删除文件夹
function rmdir(dirPath) {
    let files = fs.readdirSync(dirPath);
    // console.log(files);
    files.forEach( child => {

        let childPath = dirPath + '/' + child;

        // 当前child可能是文件也有可能是文件夹
        if ( fs.statSync(childPath).isDirectory() ) {
            //因为文件夹里面可能还会有子文件，所以也不能直接删除
            //而是需要调用rmdir方法
            // fs.rmdirSync();
            rmdir(childPath);
        } else {
            // 删除每一个子文件
            fs.unlinkSync(childPath);
        }

    } );
    fs.rmdirSync(dirPath);
}