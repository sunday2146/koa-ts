// console.log('Hello');
// console.log(__dirname);

// const electron = require('electron');

// console.log(electron.app);

/**
 * 事件
 * 属性
 * 方法
 */

const {app, BrowserWindow} = require('electron');

// Event.Emmiter
app.on('ready', () => {
    // console.log('ok');

    // setTimeout(() => {
    //     app.exit();
    // }, 2000)



    let bw1 = new BrowserWindow({
        width: 800,
        height: 600,
        // resizable: false,
        // alwaysOnTop: true,
        title: '妙味课堂',
        // frame: false,
        // transparent: true
    });
    let bw2 = new BrowserWindow({
        width: 400,
        height: 300,
        // resizable: false,
        // alwaysOnTop: true,
        title: '妙味课堂2',
        parent: bw1,
        modal : true
    });

    // 与窗口有关的浏览器中的内容都是通过下面的属性类操作的
    // bw1.webContents;
    // bw1.webContents.openDevTools();


    // console.log(bw1.id);
    // console.log(bw2.id);


    // 加载指定的页面到窗口中，支持绝对路径，但是推荐使用相对
    // 路径，而且路径在解析的时候会被处理，相对路径默认指向
    // 应用程序的根目录
    bw1.loadFile('./layout/index.html');

    // 支持加载远程文件，支持http协议，也支持file协议
    // bw1.loadURL('https://www.miaov.com');
    
});

