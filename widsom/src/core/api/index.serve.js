import Vue from 'vue'
import teacherPsy_serves from "./teacherPsy.serve"
import fileManage_serve from "./fileManage.serve"
import activity_serve from "./activity.serve"


var api = {
  teacherPsy:teacherPsy_serves,
  fileManage:fileManage_serve,
  activity:activity_serve
}

export default {
  install() {
    Vue.prototype.$api = api
  }
}
