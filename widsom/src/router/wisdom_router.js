export default [
            { 
              path: '/activity',
              component: resolve => require(['@/components/wisdoms/activity'], resolve),
              meta: {
                title: '智慧队建活动管理'
              }
            },
            { 
              path: '/medal',
              component: resolve => require(['@/components/wisdoms/medal'], resolve),
              meta: {
                title: '智慧队建奖章设置'
              }
            },
            { 
              path: '/fileManage',
              component: resolve => require(['@/components/wisdoms/fileManage'], resolve),
              meta: {
                title: '文件管理'
              }
            },
            { 
              path: '/addActivity',
              component: resolve => require(['@/components/wisdoms/addActivity'], resolve),
              meta: {
                title: '新建活动'
              }
            }
        ]