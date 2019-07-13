export default [
            { 
              path: '/fileManage',
              component: resolve => require(['@/components/fileManage/fileManage'], resolve),
              meta: {
                title: '智慧队建文件管理'
              }
            }
        ]
