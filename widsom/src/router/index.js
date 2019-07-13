import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



// 教师测评后台
import teacherPsy_routers from "./teacherPsy_routers"
// 智慧队建文件后台
import fileManage_router from "./fileManage_router"
// 智慧队建运营
import wisdom_router from './wisdom_router'


const projects = [
  teacherPsy_routers,
  fileManage_router,
  wisdom_router
]

const routes = (branches) => {
  let merge = [];
  branches.map(function(item) {
    merge.push.apply(merge, item);
  })
  return merge;
}

export default new Router({
  routes: routes(projects)
})
