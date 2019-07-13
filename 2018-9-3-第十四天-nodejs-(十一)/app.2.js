const http = require('http');
const fs = require('fs');

const app = http.createServer( (req, res) => {
    
    res.writeHead(200, http.STATUS_CODES[200], {
        'Content-Type': 'text/html;charset=utf-8'
    });

    // 通过fs读取对应的文件，返回给客户端
    let content = '';

    switch( req.url ) {
        case '/':
            staticSend(__dirname + '/static/index.html');
            break;

        case '/list':
            staticSend(__dirname + '/static/list.html');
            break;

        case '/view':
            staticSend(__dirname + '/static/view.html');
            break;

        case '/index.css':
            staticSend(__dirname + '/static/index.css', {
                'Content-Type': 'text/css;charset=utf-8'
            });
            break;

        default:
            staticSend(__dirname + '/static/404.html', {
                'Content-Type': 'text/html;charset=utf-8'
            }, 404);
            break;
    }


    function staticSend(filename, headers={'Content-Type': 'text/html;charset=utf-8'}, statusCode=200) {
        res.writeHead(statusCode, http.STATUS_CODES[statusCode], headers);
        content = fs.readFileSync(filename);
        res.end(content);
    }

} );


app.listen(80, () => {
    console.log('服务器启动成功了');
});