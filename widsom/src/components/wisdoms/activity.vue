<template>
<div>
    <!-- <v-header></v-header> -->
    <l-menu></l-menu>

    
    <div class="wisdoms-wrap">
        <div class="activity-menu">
          <router-link class="btn" to='/addActivity' tag="span">新建活动</router-link>
          <form>
            <input type='text' v-model='searchTit' placeholder="请输入活动标题" @blur='getSearchTit' />
            <select class="sel" @change='selStatus'>
              <option value="-1">请选择活动状态</option>
              <option value="0" ref='status'>草稿</option>
              <option value="1" ref='status'>下线</option>
              <option value="2" ref='status'>上线</option>
            </select>
            <select class="sel" @change='selType'>
              <option value="-1">请选择发起类型</option>
              <option value="1" ref='type'>官方</option>
              <option value="2" ref='type'>学校</option>
              <option value="3" ref='type'>领导</option>
            </select>
            <button class="btn search" @click='_getSearchList'>搜索</button>
          </form>
        </div>
        <div>
            <!-- 列表显示 -->
            <div class="grid_container">
              <table class="grid_table">
                <thead>
                  <tr class="grid_head">
                    <td width="10%"><div class="grid_text" style="text-align: center;">序号</div></td>
                    <td width="20%"><div class="grid_text">标题</div></td>
                    <td width="15%"><div class="grid_text">创建时间</div></td>
                    <td width="10%"><div class="grid_text">状态</div></td>
                    <td width="10%"><div class="grid_text">创建人</div></td>
                    <td width="10%"><div class="grid_text">参与数</div></td>
                    <td width="10%"><div class="grid_text">浏览数</div></td>
                    <td width="15%"><div class="grid_text">发起类型</div></td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="grid_row grid_row_selected" v-for='item,$index in selList'>
                    <td width="10%"><div class="grid_text" style="text-align: center;" v-text='$index+1'></div></td>
                    <td width="20%"><div class="grid_text">{{item.title}}</div></td>
                    <td width="15%"><div class="grid_text">{{item.createTime}}</div></td>
                    <td width="10%"><div class="grid_text">{{item.status}}</div></td>
                    <td width="10%"><div class="grid_text">{{item.createBy}}</div></td>
                    <td width="10%"><div class="grid_text">{{item.partakeCount}}</div></td>
                    <td width="10%"><div class="grid_text">{{item.readCount}}</div></td>
                    <td width="15%"><div class="grid_text">{{item.managerType}}</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pages">
              页数 1/<span>{{Math.ceil(total/pageSize)}}</span>转到第<input type="text" v-model='curPageNum' @change='goTo' />页共<p>{{total}}</p>条记录
            </div>
            <!-- 列表结束 -->
              <!-- 分页开始 -->
              <v-pagination :total="total" :current-page='pageSize' @pagechange="pagechange" style="float:left;"></v-pagination>
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
      searchTitle:'',
      searchTit:'',
      selList:[],
      manageType:'',
      pageNum:1,
      status:'',
      title:'',
      curPageNum:'',
      total:0,//数据总条数
      pageSize:10//每页显示数据的条数
    }
  },
  created() {
    this._getSearchList();//默认列表展示
    //this._getSearchList();
    /*this._searchList(this.manageType,this.pageNum,this.status,this.searchTitle);*/
  },
  methods: {
    getSearchTit(){
      this.searchTitle = this.searchTit;
    },
    selStatus(){
        this.status = this.$refs.status.value;
        console.log("活动状态为:" + this.status);      
    },
    selType(){
        this.manageType = this.$refs.type.value;
        console.log("活动类型为:" + this.manageType);      
    },
    _getSearchList(){
      this.manageType = this.manageType || -1;
      this.status = this.status || -1;
      this._searchList(this.manageType,this.pageNum,this.status,this.searchTitle, (result) => {
        this.selList = result.rows;
        this.total = result.total;
      })
    },
    _searchList(manageType,pageNum,status,title,callback){
      // 根据条件查询
      this.$api.activity.activityManageList(manageType,pageNum,status,title).then((result) => {
        callback(result)
      });
    },
    pagechange(currentPage){//分页
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      this._searchList(this.pageSize,this.manageType,currentPage,this.status,this.searchTitle);
    },
    goTo(){//分页
      this.$api.activity.activityManageList(manageType,this.curPageNum,status,title).then((result) => {
        callback(result)
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
ul.pagination{
  margin:0 !important;
}
.pages{
  float:left;
  margin-top:7px;
}
.pages span{
  margin-right:20px;
}
.pages p{
  padding-left:2px;
  padding-right:2px;
  display:inline-block;
}
.pages input{
  width:50px;
  text-align: center;
  margin-left:5px;
  margin-right:5px;
}
</style>
