/**
 * 在node中，tcp 协议，基于 net 模块来实现的
 */

const net = require('net');
const fs = require('fs');

/**
 * 创建一个服务器端
 *      1. 监听地址以及端口
 *      2. 处理发送到当前监听地址以及端口的数据
 *      3. 返回（发送）数据到连接的客户端
 * 
 * net.Server 类
 *      new net.Server()
 *      net.createServer()  => return new net.Server()
 */

const server = net.createServer( () => {
    // 这个函数其实就是connection事件绑定的函数
});

/**
 * function createServer(callback) {
 *  let s = new net.Server();
 *  s.on('connection', callback);
 *  return s;
 * }
 */

// 当有客户端连接的时候触发
server.on('connection', socket => {
    // socket => 当前连接的 socket 对象
    console.log('有人连接了');

    // socket.write('Hello');


    // 发送一个图片给客户端
    // let data2 = fs.readFileSync('./server/1.jpg');
    // console.log(data2)
    // socket.write( data2 );
    // socket.end();

    socket.on('data', data => {
        // socket.write('show me the money');

        console.log(data.toString(), socket.remoteAddress, socket.remotePort);
    });


});

/**
 * 监听地址及端口
 */
// server.listen(12345, '127.0.0.1');

// 0.0.0.0 : * 通配
server.listen(12345, '0.0.0.0');