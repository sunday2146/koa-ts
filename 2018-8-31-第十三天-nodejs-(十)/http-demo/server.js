const http = require('http');

/**
 * http.Server 类
 *  new http.Server()
 *  http.createServer()
 */

const server = http.createServer();

server.on('request', () => {
    console.log('接收到了请求');
});

// 80 默认，约定  给  HTTP 使用
server.listen(80, '0.0.0.0');