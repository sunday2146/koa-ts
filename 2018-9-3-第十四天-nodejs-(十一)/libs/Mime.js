const _mime = {
    'text/plain': ['txt'],
    'text/html': ['htm', 'html'],
    'text/css': ['css'],
    'text/javascript': ['js', 'jsx'],
    'image/png': ['png'],
    'image/jpeg': ['jpg']
};

module.exports = {
    getType(ext) {  //html
        for (let property in _mime) {
            let arr = _mime[property];
            if (arr.includes(ext)) {
                return property;
            }
        }
    },
    getExtension(type) {
        return _mime[type];
    }
};