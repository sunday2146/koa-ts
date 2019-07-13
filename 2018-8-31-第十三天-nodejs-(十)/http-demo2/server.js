const http = require('http');

const server = http.createServer();

/**
 * request : 客户端请求对象，保存了与当前这次请求的客户端相关的信息
 *           http.IncomingMessage 类
 * 
 * response: 服务器输出对象，提供了服务端输出（响应）有关的一些方法
 */
server.on('request', (request, response) => {
    console.log('接收到了请求');

    // 向客户端返回数据
    // request本质是net.socket+http协议增加的一些内容
    // request.socket => net.socket
    // console.log(request.socket.remoteAddress);

    // console.log(request.url);

    // 我们可以根据 url 来判断当前用户想要什么

    //response.setHeader('Content-Type', 'text/html;charset=utf8'); //MIME : https://baike.baidu.com/item/MIME/2900607?fr=aladdin

    switch(request.url) {
        case '/':
            response.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf8'
            });
            response.write('<h1>Index</h1>');
            break;
        case '/list':
            response.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf8'
            });
            response.write('<h1>List</h1>');
            break;
        case '/view':
            response.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf8'
            });
            response.write('<h1>View</h1>');
            break;
        default:
            // response.writeHead(404, http.STATUS_CODES[404], {
            //     'Content-Type': 'text/html;charset=utf8'
            // });
            // response.writeHead(404, 'ye mian mei le', {
            //     'Content-Type': 'text/html;charset=utf8'
            // });
            // response.write('<h1>页面不存在</h1>');

            response.writeHead(301, http.STATUS_CODES[301], {
                'Content-Type': 'text/html;charset=utf8',
                // 重定向地址
                // 'Location': 'http://www.miaov.com'
                'Location': '/'
            });
            response.write('<h1>页面不存在</h1>');

            break;
    }

    response.end();
});

server.listen(80, '0.0.0.0');