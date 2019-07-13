interface HttpOptions {
    method: string,
    url: string,
    isAsync: true
}
interface HttpResponseData {
    code: number,
    data: any
}

function http(options: HttpOptions) {

    let opt:HttpOptions = Object.assign({
        method: 'get',
        url: '',
        isAsync: true
    }, options);

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(opt.method, opt.url, opt.isAsync);

        xhr.onload = function() {
            let data: HttpResponseData = JSON.parse(xhr.responseText);
            resolve( data );
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


http({
    method: 'get',
    url: '....',
    isAsync: true
}).then( (rs: HttpResponseData) => {
    rs.code
} );


// @Controller
// class IndexController {

    
//     index() {

//     }

//     @router('/')
//     @method('get')
//     main() {

//     }

// }