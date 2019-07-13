const fsPromises = require('fs').promises;

// v10.0.0+
fsPromises.mkdir('./b').then(() => {
    console.log('成功')
}).catch(err=>{});