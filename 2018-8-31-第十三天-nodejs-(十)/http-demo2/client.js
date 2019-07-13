const http = require('http');
const fs = require('fs');

const client = http.request({
    host: '127.0.0.1',
    port: 80,

    protocol: 'http:',
    method: 'get',

    path: '/view'
}, res => {
    
    res.on('data', data => {
        console.log(data.toString());
    });

});

client.write('');
client.end();