/**
 * 服务端
 *      监听当前服务器上指定的ip与端口，如果有数据发送到给ip和端口上，我就进行处理
 */

const dgram = require('dgram');


/**
 * 创建一个 scoket 类，scoket 就是用来处理网络数据的一个标准 API 对象
 * 通过 scoket，我们就可以对网络数据进行读取和输出
 * 
 * dgram.Scoket 类
 */
// const socket = new dgram.Socket();

const serverSocket = dgram.createSocket('udp4');    //udp4 => ipv4

serverSocket.on('listening', () => {
    console.log('服务器开启成功，等待数据：');
});

// 当接收到数据的时候出发
serverSocket.on('message', data => {
    console.log('接收到了数据：', data.toString());
})

/**
 * 监听指定的地址以及端口
 */
serverSocket.bind(12345, '127.0.0.1');



