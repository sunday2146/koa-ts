(async function() {

    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'miaov'
    });

    /**
     * arr返回一个数组，第一个数组是记录的值，第二个数组是记录中包含的字段的信息
     */
    // let arr = await connection.query("SELECT username,age,gender FROM users");
    // console.log(arr);

    /**
     * 解构赋值
     */
    let [users] = await connection.query("SELECT username,age,gender FROM users");
    console.log(users);

    users.forEach(user => {
        console.log(user.username);
    });

})();