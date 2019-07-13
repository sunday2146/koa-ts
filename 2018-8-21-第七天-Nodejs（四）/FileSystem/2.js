const fs = require('fs');

// 当文件发生改变的时候，触发回调
// fs.watchFile('./data.txt', e => {
//     // console.log('changed');

//     //e : 类似事件对象，保存当前变化的细节
//     console.log(e); 
// });

// 监听文件或目录
fs.watch('./a', (eventType, filename) => {
    // eventType: change rename
    // filename: 当前发生改变的具体文件
    console.log(eventType, filename);
});
