<template>
  <div class="leftMenu">
    <div class="menu_logo"></div>
        <div class="layout_menu">
            <ul>
                <router-link :to='{path:item.path}' v-text='item.title' v-for='(item,i) in menuData' tag="li"></router-link>
              <!-- <li v-for="item in data" >
                <router-link :to="{path:item.path}" v-text="item.meta.title"></router-link>
              </li> -->
            </ul>
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currNum:0,
      menuData:[
        {title:'智慧队建活动管理',path:'/activity'},
        {title:'奖章设置',path:'/medal'},
        {title:'文件管理',path:'/fileManage'}
      ]
    }
  },
  methods:{
    next(index){
      this.currNum = index;
      console.log("索引值为:" + index);
    }
  }
}

</script>
<style scoped lang="scss">
.leftMenu {
  min-height: 100%;
  background:#273238;;
  width: 16.66667%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}
.menu_logo {
  width: 100%;
  height: 60px;
  background: url("../../assets/images/menu_logo.png") #009edb no-repeat 50%;
  background-size: auto 60%;
}
.leftMenu ul {
  position: relative;
  background-color: #eef1f6;
  width: 100%;
  font-size: 14px;
}
.leftMenu li {
  cursor: pointer;
  height: 56px;
  color:#aaa;
  background: #273238;
  position: relative;
  line-height: 56px;
  padding-left: 20px;
}
.leftMenu li:hover,.leftMenu li.active{
  color:#20a0ff;
  background: #fff;
}
</style>
