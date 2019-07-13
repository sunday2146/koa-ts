function http(options) {

    let options = Object.assign({
        method: 'get',
        url: '',
        isAsync: true
    }, options);

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, options.isAsync);

        xhr.onload = function() {
            resolve( JSON.parse(xhr.responseText) );
        }

        xhr.onerror = function() {
            reject({
                code: xhr.response.code,
                message: '出错了'
            });
        }

        xhr.send();
    })
}

http()

http({
    methods: 'get',
    url: '....',
    isAsync: true
});

http({
    methods: 'post',
    url: '....',
    isAsync: true
});