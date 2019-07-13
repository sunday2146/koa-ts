const http = require('http');
const fs = require('fs');
const Mime = require('./libs/Mime');

let users = [
    {
        name: 'Reci',
        gender: '女',
        skills: ['产品','设计','程序','运维','客服','前台','行政']
    },
    {
        name: 'Kimoo',
        gender: '男',
        skills: ['烹饪', '门卫', '保安']
    },
    {
        name: 'zMouse',
        gender: '男',
        skills: ['招财']
    }
];

const app = http.createServer( (req, res) => {
    
    res.writeHead(200, http.STATUS_CODES[200], {
        'Content-Type': 'text/html;charset=utf-8'
    });
    let content = '';

    /**
     * 把动态与静态资源进行区分：url
     *  约定：以 /static 开头的都算是静态，我约定把静态文件都放在了 /static 对应的目录下
     */
    // console.log( req.url.startsWith('/static'))
    if ( req.url.startsWith('/static') ) {
        staticSend(__dirname + req.url);
    } else {
        //动态

        switch(req.url) {
            case '/user':
                res.writeHead(200, http.STATUS_CODES[200], {
                    'Content-Type': 'application/json;charset=utf-8'
                });

                let data = users.map( user => user.name );

                res.end(JSON.stringify(data));
                break;

            case '/getbaidu':
                const r = http.request({
                    host: 'www.baidu.com'
                }, function(badiuRes) {
                    let data = '';
                    badiuRes.on('data', (chunk) => {
                        data += chunk.toString();
                    });
                    badiuRes.on('end', () => {
                        // console.log('响应中已无数据。');
                        res.end(data);
                    });
                });
                r.end();
                break;
        }
    }
    

    function staticSend(filename, headers={'Content-Type': 'text/html;charset=utf-8'}, statusCode=200) {

        if (fs.existsSync(filename)) {

            let ext = filename.substring( filename.lastIndexOf('.') + 1 );

            if (!ext) {
                ext = 'txt';
            }

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