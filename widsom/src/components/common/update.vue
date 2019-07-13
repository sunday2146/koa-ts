<template>
　　<div class="update">

　　　　<!-- 通过input获取文件 ，为了美观使用v-show="false" 将input隐藏 通过input的change事件绑定fileChange-->
　　　　<input type="file" v-show="false" accept="image" ref="input" @change="fileChange($event.target.files)">
　　　　<!-- 通过$refs操作input的点击事件，调起文件选择 -->
　　　　<div class="btn btn-default" @click="$refs.input.click()">
  上传
　　　　　　<!-- 通过slot内容分发将头像的显示交给父组件,父组件可以自定义图片样式 -->
　　　　　　<slot></slot>
　　　　</div>
　　</div>
</template>
<script>
/*
　　auth:袁
　　作用:文件上传
　　返回事件: file
　　返回事件参数: file对象
*/
export default {
　　methods: {
　　　　fileChange(files) {
　　　　/* 通过FormData对象可以组装一组用 XMLHttpRequest发送请求的键/值对。
　　　　它可以更灵活方便的发送表单数据，因为可以独立于表单使用。如果你把表单
　　　　的编码类型设置为multipart/form-data ，则通过FormData传输的数据格式
　　　　和表单通过submit() 方法传输的数据格式相同*/
　　　　// 你可以自己创建一个FormData对象，然后通过调用它的append()方法添加字段，就像这样：
　　　　let formData = new FormData();
　　　　formData.append('fileinfo', files[0]);
　　　　//由于我的请求接口需要openid所以需要再次向FormData对象添加openid字段，如果你们不需要可以不用此操作
// 　　　　formData.append('openid', localStorage.getItem('openid'));
　　　　// 向父组件传递参数，事件为fileChange，参数为formData对象
　　　　this.$emit('fileChange', formData)
　　　　},
　　}
}

</script>
<style scoped>
 .btn{width: 54px;height: 54px;line-height: 54px;}
</style>
