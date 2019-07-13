const inquirer = require('inquirer');

// 提问用户，与用户进行命令行的交互
// prompt数组中存放一个指定格式的对象，我们称为question对象
inquirer.prompt([

    {
        type: 'input',
        name: 'username',
        message: '请输入你的应用名称',
        default: 'app',
        // 对用户输入的数据或选择的数据进行验证
        validate(val) {
            if (val.trim() === '') {
                return '应用名称不能为空';
            }
            return true;
        },
        // 对用户输入的数据或选择的数据进行过滤
        filter(val) {
            return val.toLowerCase();
        }
    },

    {
        type: 'confirm',
        name: 'useES6',
        message: '是否启用ES6支持',
        default: true
    },
    {
        type: 'list',
        name: 'framework',
        message: '请选择框架：',
        choices: ['Vue', 'React', 'Angular'],
        default: 1
    },
    // {
    //     type: 'rawlist',
    //     name: 'framework2',
    //     message: '请选择框架：',
    //     choices: ['Vue', 'React', 'Angular'],
    //     default: 1
    // },
    {
        type: 'checkbox',
        name: 'tools',
        message: '开发工具',
        choices: [
            {
                name: '使用ESLint',
                value: 'eslint',
                checked: true
            },
            {
                name: '使用mocha单元测试',
                value: 'mocha'
            }
        ]
    }

]).then(answers=>{
    console.log(answers);
})