const http = require('http');
const fs = require('fs');
const Mime = require('./libs/Mime');

// console.log(Mime.getType('txt'));    //   'text/plain'
// console.log(Mime.getType('html'));    //   'text/html'
// console.log(Mime.getExtension('text/html')); // ['html', 'htm']

const app = http.createServer( (req, res) => {
    
    res.writeHead(200, http.STATUS_CODES[200], {
        'Content-Type': 'text/html;charset=utf-8'
    });

    /**
     * 我们直接让用户访问/static/index.html,/static/list.html
     * 用户在url后面带的路径，我们直接就把他关联到服务器本地的目录文件中
     */
    let content = '';

    // staticSend(__dirname + '/static/index.html');
    staticSend(__dirname + req.url);

    function staticSend(filename, headers={'Content-Type': 'text/html;charset=utf-8'}, statusCode=200) {

        if (fs.existsSync(filename)) {

            let ext = filename.substring( filename.lastIndexOf('.') + 1 );

            if (!ext) {
                ext = 'txt';
            }

            // 根据扩展名输出对应的MIME
            headers['Content-Type'] = Mime.getType(ext);

            res.writeHead(statusCode, http.STATUS_CODES[statusCode], headers);
            content = fs.readFileSync(filename);
            res.end(content);
        } else {
            staticSend(__dirname + '/static/404.html', {
                'Content-Type': 'text/html;charset=utf-8'
            }, 404);
        }

        
    }

} );


app.listen(80, () => {
    console.log('服务器启动成功了');
});