const {app, BrowserWindow, ipcMain} = require('electron');

// 主进程
let username = 'zMouse';

global.username = username;

let datas = {
    username: 'zMouse',
    gender: '男'
}

app.on('ready', () => {

    const win = new BrowserWindow();


    win.webContents.openDevTools();

    win.loadFile('./layout/index.html');

    // 监听渲染进程 ipcRenderer 发送的消息

    ipcMain.on('getData', function(e, key) {
        // console.log(data);

        // e.sender => 通过这个对象返回消息给渲染进程
        e.sender.send('sendData', datas[key]);

    });

    // 主进程主动发送消息到渲染进程
    setTimeout(() => {
        win.webContents.send('hello', 'hello........', 10, 20, 30);
    }, 2000);


    const win2 = new BrowserWindow();
    win2.webContents.openDevTools();

    win2.loadFile('./layout/index2.html');
});