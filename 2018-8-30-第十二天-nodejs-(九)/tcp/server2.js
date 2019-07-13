/**
 * 在node中，tcp 协议，基于 net 模块来实现的
 */

const net = require('net');

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
server.on('connection', () => {
    console.log('我是莫莫');
});

/**
 * 监听地址及端口
 */
server.listen(12346, '10.220.17.238');