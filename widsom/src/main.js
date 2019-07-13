// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import './assets/css/bootstrap.min.css'
import './assets/css/reset.scss'
import './assets/css/bootstrap-datetimepicker.min.css'
import './assets/js/bootstrap.min'
import './assets/js/bootstrap-datetimepicker.min'

// 注册全局请求
import VueWechatTitle from 'vue-wechat-title'//动态获取title
Vue.use(VueWechatTitle)
import api from './core/api/index.serve'
Vue.use(api)
//注册全局通用属性,方法
import global from './core/global/global'
Vue.use(global)

import directive from './core/directive/directive'
Vue.use(directive)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
