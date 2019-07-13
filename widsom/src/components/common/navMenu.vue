<template>
  <div class="navMenu">
    <div class="menu_logo"></div>
    <ul>
      <li v-for="item in data" >
        <router-link :to="{path:item.path}" v-text="item.meta.title"></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    data: {
      type: Array,
    },
  },
  computed: {

  },
}

</script>
<style scoped lang="scss">
.navMenu {
  min-height: 100%;
  background-color: rgb(248, 248, 248);
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

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  color: #20a0ff;
}

.navMenu ul {
  position: relative;
  background-color: #eef1f6;
  width: 100%;
  font-size: 14px;
}

.navMenu li {
  height: 56px;
  position: relative;
  line-height: 56px;
  padding-left: 20px;
}

.navMenu li.active {
  background: #fff;
  color: #20a0ff;
}

.navMenu li.active:before {
  content: "";
  display: block;
  width: 4px;
  height: 56px;
  position: absolute;
  left: 0;
  top: 0;
  background: #009edb;
}

</style>
