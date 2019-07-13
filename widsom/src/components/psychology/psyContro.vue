<template>
<div v-wechat-title="$route.meta.title">
    <v-header></v-header>
    <v-menu v-if="$global.psychologyPathData.length!=0" :data="$global.psychologyPathData"></v-menu>

    
    <div class="wrapper">
    <!-- 导航结束 -->
    <nav class="navbar">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li @click="_getTestRecords(1,1)" :class="{ 'active': type==1}"><a href="#">测验记录列表</a></li>
            <li @click="_getTestRecords(2,1)" :class="{ 'active': type==2}"><a href="javascript:void(0)">预警</a></li>
            <li class="mL1"><input type="text" class="w100 txt btn btn-default" v-model="search.userName" placeholder="按教师姓名搜索" name="" value=""> </li>
            <li class="dropdown  mL1">
              <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span v-text="questionName" class="w100 nowrap"></span>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li v-for="item in question" @click="selectQuestion(item)"><a href="javascript:void(0)" v-text="item.name"></a></li>
              </ul>
            </li>
            <li class="mL1">
              <div class="input-group w100 date form_date" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="text w100 settime-input" type="text" v-bind:value="search.startTime" placeholder="开始时间">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
             </div>
            </li>
            <li class="mL1">
              <div class="input-group w100 date form_date" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="text w100 settime-input2" type="text" v-bind:value="search.endTime" placeholder="结束时间">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
             </div>
            </li>
            <li class="three mL1">
                <button type="button" @click="toSearch(1)" class="btn btn-primary">搜索</button>
                <button type="button" @click="toSearch(2)" class="btn btn-default">清空</button>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>
    <!-- 导航结束 -->
    <!-- 列表显示 -->
    <p class="no-search" v-if="list==''">暂无数据</p>
    <div class="tab container-fluid" v-if="list!=''">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <td class="w150">教师姓名</td>
            <td class="w150">教师电话</td>
            <td class="w250">问卷名称</td>
            <td class="w150">参与时间</td>
            <td class="w80">得分</td>
            <td class="w150">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list">
            <td scope="row" v-text="item.userName">{{item}}</td>
            <td v-text="item.mobile||'暂无'"></td>
            <td data-toggle="modal" data-target="#myModal"  @click="dialogShow(item)"><u v-text="item.qaName"></u></td>
            <td v-text="item.endTime"> </td>
            <td v-text="item.score||'0'"></td>
            <td data-toggle="modal" data-target="#myModal" @click="dialogShow(item)"><u>查看详情</u></td>
          </tr>
        </tbody>
      </table>
      <!-- 分页开始 -->
        <v-pagination :total="data.count" :current-page='current' @pagechange="pagechange"></v-pagination>
        <v-modal   :rels="rel"></v-modal>
      <!-- 分页结束 -->
    </div>
    <!-- 列表结束 -->
  </div>

</div>
</template>
<script>
import pagination from '@/components/common/pagination'//分页
import modal from '@/components/common/dialog'//左侧
import navHeader from '@/components/common/navHeader'//头部
import navMenu from '@/components/common/navMenu'//左侧
export default {
  data() {
    return {
      data:{},
      list:[],
      display: 10,   // 每页显示条数
      current: 1,   // 当前的页数
      schoolId:"", //557d952a0cf2f3668d0b7220
      type:1,
      search:{"userName":"","qaId":"","startTime":"","endTime":""},
      question:[],
      questionName:"选择问卷名称",
      isShowLog:true,
      rel:{},
    }
  },
  mounted(){
    this.dateDefind();//时间控件调用
    this._validateLogin(0);
    this._getQuestionaires();
  },
  methods: {
    dialogShow(item){

this._getFeedBack(item.id,(result)=>{
        var result=result.data;
        result.feedback="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+result.feedback.replace(/\n/g, "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        var str=`<div class="detail">
                      <p class="s16 text-danger">得分:
                          <span>${item.score}</span>
                      </p>
                      <div class="cont">${result.feedback}</div>
                </div>`;

        let data={
          title:item.qaName,
          content:str,
        }
        this.rel=data;
      });
    },
    _getFeedBack(userId,callBack){
    console.log(this.$apis)

      this.$api.teacherPsy.getFeedBack(userId).then((rel)=>{
        callBack(rel);
      });
    },
    _validateLogin(e){//登录验证接口
      this.$api.teacherPsy.validateLogin(e).then((rel)=>{
      if(rel.msg=="请先登录系统"){
        this.schoolId="557d952a0cf2f3668d0b7220";
      }else{
        this.schoolId=rel.data.schoolId;
      }
        this._getTestRecords(1,1);
      });
    },
    _getQuestionaires(){//获取问卷名称
      this.$api.teacherPsy.getQuestionaires().then((rel)=>{
         this.question=rel.data;
      });
    },
    _getTestRecords(type,currentPage){//切换预警
      this.type=type;
      this.pagechange(currentPage)
    },
    toSearch(val){//搜索方法
      if(val==2){
        this.search.userName="";
        this.search.qaId="";
        this.search.startTime="";
        this.search.endTime="";
      }
      this.pagechange(1)
    },
    selectQuestion(item){
      this.search.qaId=item.id;
      this.questionName=item.name;
    }
    ,pagechange(currentPage){//分页
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      if(this.type==1){
        this.$api.teacherPsy.getTestRecords(this.schoolId,currentPage,this.display,this.search).then((rel)=>{
          this.data=rel.data;
          this.list=rel.data.data;
        });
      }else{
        this.$api.teacherPsy.getTestAlertRecords(this.schoolId,currentPage,this.display,this.search).then((rel)=>{
          this.data=rel.data;
          this.list=rel.data.data;
        });
      }
      this.list=this.list;
    },
    dateDefind () {//时间控件
      var self=this;
          $('.form_date').datetimepicker({
            language:  'zh-CN',
            format:'yyyy-mm-dd',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
          }),
          $('.form_date').datetimepicker()
          .on('hide',function(e){
            self.search.startTime=$('.settime-input').val();
            self.search.endTime=$('.settime-input2').val();
          })
          // $('#myModal').on('show.bs.modal', function () {
          //   console.log("dddd")
          //     // 执行一些动作...
          //   })
          // console.dir($('#myModal'))
     }
  },
  components: {
      'v-pagination': pagination,
      'v-modal':modal,
      'v-header': navHeader,
      'v-menu':navMenu,

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn{outline: 0 !important;}
.datetimepicker{width: auto !important;}
.navbar .txt{margin-top: 8px;border-radius: 0;width: 150px;text-align: left;outline: 0;cursor: auto;}
.nowrap{white-space: nowrap;overflow: hidden;display: inline-block;vertical-align: middle;}
.dropdown .dropdown-menu{min-width:100%;max-height: 300px;overflow: auto;}
.dropdown .dropdown-menu li{border-bottom: 1px solid #e5e5e5;padding:3px 0;}
.dropdown .dropdown-menu li:last-child{border: 0;}
.navbar .form_date{background: #fff;border: 1px solid #ccc;margin-top: 8px;padding-left:6px;}
.navbar .form_date input,.navbar .input-group-addon{border: 0;border-radius: 0;height: 32px;}
/* .txt{padding: 6px 14px;} */
#module_contro .btn-g {
  text-align: center;
}
#module_contro .tab tbody td,#module_contro .tab tbody th{
  vertical-align: middle;
}
#module_contro .tab tbody img{
  width:54px;
  height: 54px;
}
#module_contro .tab u{
  cursor: pointer;
}
</style>
