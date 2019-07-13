<template>
  <div class="navHeader">
    <div class="el-breadcrumb">
      <span class="el-breadcrumb__item">
            <span class="el-breadcrumb__item__inner">首页</span>
      <span class="el-breadcrumb__separator">/</span>
      </span>
      <span class="el-breadcrumb__item">
            <span class="el-breadcrumb__item__inner">教师测评管理</span>
      <span class="el-breadcrumb__separator">/</span>
      </span>
    </div>
    <span class="navRight">
        <a class="text-primary" @click="goHome()">返回老版本后台</a>
      </span>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  computed: {},
  methods: {
    goHome() {
      let url = "http://" + location.host+"/school/teacher";
      window.location.href = url
    }
  }
}

</script>
<style scoped lang="scss">
.navHeader {
  background-color: #eff2f7;
  height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 20px;
  position: fixed;
  top: 0;
  left: 16.66667%;
  right: 0;
  z-index: 2;
}

.el-breadcrumb__item__inner,
.el-breadcrumb__item__inner a {
  color: #48576a;
}

.el-breadcrumb__separator {
  margin: 0 8px;
  color: #bfcbd9
}

.el-breadcrumb__item__inner:hover,
.el-breadcrumb__item__inner a:hover {
  color: #20a0ff;
  cursor: pointer
}

.el-breadcrumb__item:last-child .el-breadcrumb__item__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover {
  color: #97a8be;
  cursor: text;
}

.el-breadcrumb__item:last-child .el-breadcrumb__separator {
  display: none
}

.navRight {
  padding-right: 20px;
  cursor: pointer;
}

</style>
