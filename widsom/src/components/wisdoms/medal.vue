<template>
<div>
    <!-- <v-header></v-header> -->
    <l-menu></l-menu>

    <div class="wisdoms-wrap">
        <div class="activity-menu">
          <span class="btn" data-target="#addMedal" data-toggle="modal">新增奖章</span>
        </div>
        <!--新增奖章-->
        <div class="modal-box" id="addMedal" v-show='medalLay'>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title">新增奖章</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="control-label">奖章名称:</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="recipient-name" class="control-label">奖品图片:</label>
                    <input type="text" class="form-control" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </div>
            </div>
          </div>
        </div>
        <!--新增奖章-->
        <div>
            <!-- 列表显示 -->
            <div class="grid_container">
              <table class="grid_table">
                <thead>
                  <tr class="grid_head">
                    <td width="10%"><div class="grid_text" style="text-align: center;">序号</div></td>
                    <td width="20%"><div class="grid_text">奖章名称</div></td>
                    <td width="15%"><div class="grid_text">奖章图片</div></td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="grid_row grid_row_selected" v-for='(item,$index) in medalList'>
                    <td width="10%"><div class="grid_text" style="text-align: center;">{{$index+1}}</div></td>
                    <td width="20%"><div class="grid_text">{{item.medalName}}</div></td>
                    <td width="15%"><div class="grid_text"><img :src='item.medalImg' /></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 列表结束 -->
              <!-- 分页开始 -->
              <!-- <v-pagination :total="data.count" :current-page='current' @pagechange="pagechange"></v-pagination> -->
              <!-- 分页结束 -->
        </div>
  </div>

</div>
</template>
<script>
import pagination from '@/components/common/pagination'//分页
import leftMenu from '@/components/common/leftMenu'//左侧
export default {
  data() {
    return {
      medalLay:false,
      pageNum:1,
      medalList:[]
    }
  },
  mounted(){
    this._getMedalList();
    /*this.dateDefind();//时间控件调用
    this._validateLogin(0);
    this._getQuestionaires();*/
  },
  methods: {
    _getMedalList(){
      this.$api.activity.medalList(this.pageNum).then((result) => {
        this.medalList = result.rows;
      });
    }
  },
  components: {
      'v-pagination': pagination,
      'l-menu':leftMenu,

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wisdoms-wrap{
  margin-top:6px;
  margin-left:18%;
}
.activity-menu{overflow: hidden;}
.activity-menu span,.activity-menu form{
  float:left;
}
.btn {
  display: inline-block;
  background: #63a8eb;
  border: 1px solid #4498e9;
  color: white;
  border-radius: 2px;
  padding: 5px 16px;
  line-height: 20px;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  margin-top:6px;
}
.btn:hover{background:#4498e9;}
.activity-menu input{
  width:180px;
  padding-top:3px;
  padding-left:r(20);
  padding-bottom:4px;
}
.activity-menu form{
  margin-top:r(24);
  margin-left:r(40);
}
.activity-menu select{
  padding-top:3px;
  padding-bottom:4px;
}
.sel{width:180px;height:32px;}
.btn.search{margin-top:-4px;}
.grid_container {
  width: 98%;
  border-top: 1px solid rgb(205,205,205);
  border-right: 1px solid rgb(205,205,205);
  background: #fff;
  float:left;
  margin-top:15px;
  margin-bottom:15px;
}

.grid_table {
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
}

.grid_table td {
  border-bottom: 1px solid rgb(205,205,205);
  border-left: 1px solid rgb(205,205,205);
  padding: 0px;
  line-height: 40px;
  position: relative;
}

.grid_table td, .grid_table .chk_container {
  line-height: 40px;
  height: 40px;
}

.grid_table td .grid_text {
  padding: 0px 10px;
/*  border-top: solid 1px transparent; */
  overflow:hidden; 
  white-space:nowrap; 
  text-overflow:ellipsis;
  text-align: left;
}

.grid_table .chk_container {
  display: block;
  border-right: 1px solid rgb(205,205,205);
  position: absolute;
  left: 0px;
  top: 0px;
  width: 40px;
  text-align: center;
  vertical-align: middle;
  height: 41px;
}

.grid_table .chk_container input {
  margin-top: 12px;
}

.grid_head {
  background: rgb(227,232,235);
  font-weight: bold;
}

.grid_row:hover {
  background: rgb(223,238,250);
}

.grid_row td .grid_text {
/*  border-top: solid 1px #fff; */
  min-height: 40px;
  overflow: hidden;
}

.modal-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  overflow: hidden;
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1040;
  background: rgba(0, 0, 0, .5);
}

</style>
