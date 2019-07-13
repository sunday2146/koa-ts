<template>
  <div class="file-model" v-wechat-title="$route.meta.title">
    <!-- <v-header></v-header>
    <v-menu v-if="$global.fileManagePathData.length!=0" :data="$global.fileManagePathData"></v-menu> -->
    <div class="opera">
      <span class="opera-tit">年份</span>
      <!-- 左侧年份列表 -->
      <ul id="opera">
        <li :class='curNum == index ? "on" : ""' v-for='(item,index) in addFiles' track-by="index"><span v-text="item.year" @click='selectFiles(item.year,index)'></span>&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger" style="padding: 0px 7px;font-size: 11px;float:right;margin-top: 8px;margin-right: 2px" @click="delYear(item.year,index)">删除</button>
        </li>
      </ul>
      <!-- 左侧年份列表 -->
      <p data-target="#addyear" data-toggle="modal" class=" btn btn-default">添加年份</p>
    </div>
    <div class="wrapper">
      <div class="storage">
        <h3 class='stora-tit'>文件存储</h3>
        <div class="alert alert-danger alert-dismissible" role="alert" v-show="isAlert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>提示!</strong> 需要单个删除年份下面包含文件夹
        </div>
        <!-- 当前年份文件列表 -->
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <td>文件夹名称</td>
              <td>创建时间</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in yearsFiles" v-if='item.createDate != null && item.createDate != ""'>
              <td scope="row">{{item.fileName}}</td>
              <td>{{item.createDate}}</td>
              <td><u data-target="#editFil" data-toggle="modal" @click="editFileName(item.id,'no')">编辑</u>|<u data-target="#relatFile" data-toggle="modal" @click='relatFile(item.id)'>关联文件</u>|<u data-target="#dele" data-toggle="modal" @click="delEnter(item.id,'')">删除</u></td>
            </tr>
          </tbody>
        </table>
        <!-- 当前年份文件列表 -->
        <p class='addFile' data-target="#addFile" data-toggle="modal">添加文件夹</p>
      </div>
      <!--添加年份的弹层-->
      <div class="modal-box" id="addyear" v-show='yearLay'>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="addYearLabel">添加年份</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="control-label">请输入年份:</label>
                  <input type="text" class="form-control" v-model="addYear" placeholder="限制4位">
                </div>
              </form>
              <div class="alert alert-danger" role="alert" v-show="alertBool">输入有误,请检查</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="sure(addYear,'yes')">确定</button>
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="sure">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-box" id="addFile" v-show='yearLay'>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="addYearLabel">添加文件夹</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="control-label">请输入文件夹名称:</label>
                  <input type="text" class="form-control" v-model="addfileName" placeholder="限制6字">
                </div>
              </form>
              <div class="alert alert-danger" role="alert" v-show="alertBool">输入有误,请检查</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="addFile(addfileName,'yes')">确定</button>
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="sure">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-box" id="editFil" v-show='yearLay'>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="addYearLabel">编辑文件夹</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="control-label">请输入文件夹名称:</label>
                  <input type="text" class="form-control" v-model="addfileName" placeholder="限制6字">
                </div>
              </form>
              <div class="alert alert-danger" role="alert" v-show="alertBool">输入有误,请检查</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="editFileName(editId,addfileName)">确定</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-box" id="dele" v-show='yearLay'>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="addYearLabel">提示</h4>
            </div>
            <div class="modal-body">
              <div class="alert alert-danger" role="alert">确认删除本条?</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="delEnter(editId,'yes')">确定</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--关联文件夹的弹层-->
    <div class="modal-box" id="relatFile" v-show='yearLay'>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click=''><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="relatFileLabel">关联文件</h4>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="回车搜索标题关键字" v-model="searchStr" @keydown.enter="searchFiles(searchStr)" style="cursor: pointer;">
              <span class="input-group-addon" id="basic-addon2" @click="searchFiles(searchStr)">搜索</span>
            </div>
            <div class="form-group">
              <div>
                <div class="searchFile tab">
                  <table class="table  table-bordered table-hover">
                    <thead>
                      <tr>
                        <td style='width:10%'>序号</td>
                        <td style='width:80%'>文件标题</td>
                        <td style='width:10%'>操作</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in allData">
                        <td style='width:10%' v-text="index+1"></td>
                        <td style='width:80%' v-text="item.title"></td>
                        <td style='width:10%'>
                          <input type="checkbox" v-model="item.bool" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click='enterSave()'>确定</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show=''></div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3,
p,
span,
ul {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

u {
  text-decoration: none;
}

label {
  float: left;
  line-height: 35px;
  padding-right: 10px;
}

.form-control {
  width: 300px;
}

.file-model {
  width: 100%;
  overflow: hidden;
}

.opera {
  width: 150px;
  float: left;
  background: #f5f5f5;
  text-align: center;
  border-right: 1px solid #d0d0d0;
  position: absolute;
  top: 60px;
  left: 16.66667%;
  bottom: 0;
  z-index: 2;
  overflow: auto;
}

.opera span.opera-tit {
  display: block;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
  color: #fff;
  background: #027ed6;
  border-bottom: 1px solid #666;
}

.opera li {
  height: 35px;
  cursor: pointer;
  line-height: 35px;
  border-bottom: 1px solid #d3d9cd;
}

.opera li.on {
  background: #ffc23f;
}

.opera p {
  color: #fff;
  display: block;
  text-align: center;
  line-height: 35px;
  background: #31b0d5;
  cursor: pointer;
}




/*.opera p:hover {
  color: #fff;
  background: #f93333;
}*/

.stora-tit {
  font-size: 18px;
  height: 35px;
  color: #fff;
  text-align: center;
  line-height: 35px;
  background: #027ed6;
}

.storage {
  margin-left: 150px;
  margin-top: -20px;
}

.storage u {
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}

.modal-title {
  text-align: center;
}

.addFile {
  display: block;
  height: 40px;
  cursor: pointer;
  background: #dbf0f5;
  margin-top: -20px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}

.addFile:hover {
  color: #fff;
  background: #0a92ad;
}

#relatFile .form-group input.search {
  width: 420px;
  height: 30px;
  border: 1px solid #ddd;
  padding-left: 20px;
  border-radius: 2px;
  line-height: 30px;
}

.searchFile {
  width: 560px;
  margin-top: 15px;
}

.searchFile table {
  width: 100%;
  border-collapse: collapse;
}

.searchFile td {
  display: block;
  float: left;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  border-top: 1px solid #ddd;
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

.pagination {
  margin-left: -4px !important;
}

.searchFile {
  max-height: 300px;
  overflow-y: auto;
}


.file-model .table-bordered>tbody>tr>td {
  border: none;
  border-top: 1px solid #ddd;
  border-bottom-width: 0;
}

.file-model .table-bordered>tbody>tr>th {
  border: none;
  border-top: 1px solid #ddd;
}

</style>
<script>
import pagination from '@/components/common/pagination'
/*import navHeader from '@/components/common/navHeader' //头部
import navMenu from '@/components/common/navMenu' //左侧*/
export default {
  data() {
    return {
      addFiles: [],
      curNum: 0,
      yearsFiles: [], //当前年份,文件夹
      alertBool: false,
      currentYear: {},
      addfileName: "",
      addYear: "",
      editId: "",
      yearLay: false,
      allData: [],
      isAllData: [],
      relatFileId: {},
      searchStr: "",
      isAlert: false
    }
  },
  mounted() {
    this.pageInit();
  },
  methods: {

    pageInit() {
      this._getFilesAll((result) => {
        if(result.data.length==0){
          return;
        }
        this.addFiles = result.data;
        this.selectFiles(this.addFiles[0].year, 0);
      })
    },

    selectFiles(year, index) {

      this.curNum = index;
      this._getFiles(year, (result) => {
        if (result.success) {
          this.yearsFiles = result.ybFliesList;
          console.log(this.yearsFiles);
        }
      })
      console.log(this.addFiles[index]);
      this.currentYear = this.addFiles[index];
    
    },



    _getFilesAll(callback) {
      // 获取所有年份
      this.$api.fileManage.getFilesAll().then((result) => {
        callback(result)
      });
    },
    _getFiles(year, callback) {
      // 年份获取文件夹
      this.$api.fileManage.getFiles(year).then((result) => {
        callback(result)
      });
    },


    sure(year, status) {

    // for(var )


      var ck = /^[0-9]{4}$/;
      if (status == "yes") {
        if (ck.test(year)) {
          this.alertBool = false;
        } else {
          this.alertBool = true;
          $('#addyear .alert-danger').text("输入有误请检查");
          return;
        }

      }

      for (let i = 0; i < this.addFiles.length; i++) {
        if (year == this.addFiles[i].year) {
          $('#addyear .alert-danger').text("年份不能重复");
          this.alertBool = true;
          return;
        }
      }

      this.alertBool = false;
      $('#addyear').modal("hide");
      this.addYear = "";
      this.$api.fileManage.addYears(year).then((result) => {
        // console.log(result);
        if (result.success) {
          var temp = {
            year: result.year,
            yearId: result.yearId
          }
          this.addFiles.push(temp);

          if(this.addFiles.length==1){
            this.currentYear = temp;
          }
        }
      });

    },
    addFile(fileName, status) {
      if (status == "yes") {
        if (fileName.length > 6 || fileName == "") {
          this.alertBool = true;
          return;
        } else {
          this.alertBool = false;
        }
      }
      // console.log(this.currentYear.yearId, fileName);
      this._addNewFiles(this.currentYear.id||this.currentYear.yearId, fileName, (result) => {
        var temp = {
          fileName: result.fileName,
          createDate: result.createDate,
          id: result.fileId
        }
        this.yearsFiles.push(temp);
        this.addfileName = "";
        console.log(this.yearsFiles);
      })
      $('#addFile').modal("hide");
    },
    _addNewFiles(yearId, fileName, callback) {
      this.$api.fileManage.addNewFiles(yearId, fileName).then((result) => {
        callback(result)
      });
    },
    editFileName(id, findName) {
      this.editId = id;
      if (findName == 'no') return;
      // console.log();

      if (findName == "" || findName.length > 6) {
        this.alertBool = true;
        return;
      } else {
        this.alertBool = false;
      }
      this._editTrue(this.editId, findName, (result) => {
        this.yearsFiles.forEach((item, index) => {
          if (this.editId == item.id) {
            item.fileName = findName;
            $('#editFil').modal("hide");
            this.addfileName = "";
          }
        })
      })

    },
    _editTrue(fielId, fileName, callback) { //编辑
      this.$api.fileManage.editFile(fielId, fileName).then((result) => {
        callback(result)
      });
    },
    delEnter(id, status) {
      this.editId = id;
      if (status == "yes") {
        this.$api.fileManage.delFile(this.editId).then((result) => {
          console.log(result.msg);
          this.yearsFiles.forEach((item, index) => {
            if (this.editId == item.id) {
              this.yearsFiles.splice(index, 1)
              $('#dele').modal("hide");
            }
          })
        });
      }
    },

    relatFile(id) {
      this.relatFileId = id;
      this.$api.fileManage.relationFile(id).then((result) => {
        console.log(result);
        var isExitArctile=result.isExitArctile;
        var activityArticleList=result.activityArticleList;
        var yes=[];
        for(var i=0;i<activityArticleList.length;i++){

          for(var n=0;n<isExitArctile.length;n++){
            if(activityArticleList[i].id==isExitArctile[n].id){
              activityArticleList[i].bool=true;
            }
          }
        }
         this.allData=activityArticleList;
         // console.log(activityArticleList);
      })
    },
    enterSave() {
      var yes = "";
      var no="";

      this.allData.forEach((item) => {
        if (item.bool) {
          yes += item.id + ','
        }else{
          no += item.id+',';
        }
      })
      yes=yes.slice(0, -1);
      no =no.slice(0, -1);

      console.log(yes);
      if(!yes){
        yes="isdelAll";
      }

      this.$api.fileManage.saveFileIds(this.relatFileId, yes).then((result) => {
        $('#relatFile').modal("hide");
        console.log(result.msg);
      })

       this.$api.fileManage.deleteFileId(this.relatFileId,no).then((result)=>{
        console.log(result.msg);
       })

    },
    searchFiles(str) {
      console.log(this.searchStr.length == 0);
      if (this.searchStr.length == 0) { return }
      this.$api.fileManage.relationSearchFile(str).then((result) => {
        this.allData = result.data;
      })
    },
    delYear(year, index) {
      this.selectFiles(year, index);
      this._getFiles(year, (result) => {
        var arr = [];
        var isArr = result.ybFliesList;
        for (var i = 0; i < isArr.length; i++) {
          // console.log(result[i]);
          if (isArr[i].createDate == null) {
            continue;
          } else {
            arr.push(isArr[i]);
          }
        }

        if (arr.length != 0) {
          this.isAlert = true;
          setTimeout(() => {
            this.isAlert = false;
          }, 2000);

        }else{
         this.addFiles.forEach((item, index) => {
              // console.log();
              if(year==item.year){
                this.addFiles.splice(index, 1);
                this.$api.fileManage.delFile(item.id).then((result) => {
                  // console.log(result);
                  if(this.addFiles!=0){
                     this.selectFiles(this.addFiles[0].year, 0);
                  }

                })
              }
         
          })
        }

      });
    }
  },
  watch: {
    searchStr() {
      if (this.searchStr.length == 0) {
        this.relatFile(this.relatFileId);

      }
    }
  },
  components: {
    'v-pagination': pagination,
 /*   'v-header': navHeader,
    'v-menu': navMenu*/
  }
}

</script>
