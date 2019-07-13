<template>
	<div>
		<l-menu></l-menu>
		<div class="wisdoms-wrap">
			<div class="addCont clearfix">
				<p class="addTitle"><span>活动管理</span></p> <br>
				<input type="hidden" value="create" id="business">
				<form action="ypm/saveActivity" method="post" id="ac_form">
					<input type="hidden" id="status" name="status">
					<input type="hidden" id="activityId" name="activityId" value="">
					  <div class="addTab">
					      <table> 
					          <tbody><tr>
					              <td><span class="important">活动标题：</span>
					                <input type="text" value="" style="width:500px;" id="title" name="title" placeholder="请输入活动标题" class="text validate">
					              </td>
					          </tr> 
					          <tr>
					              <td>
					              	  <span class="important">活动类型：</span>
					                  <select class="txt" id="activityType" name="activityType">
										<option value="1">主题教育活动</option>
										<option value="2">少先队品牌活动</option>
										<option value="3">常规活动</option>
									 </select>
					              </td>
					          </tr>
					          <tr>
					              <td>
					              	  <span class="important">活动介绍：</span>
					               </td>
					          </tr>
					          <tr>
					              <td>
					                <textarea style="width: 800px;height: 100px;" name="intro" id="intro"></textarea>
					              </td>
					          </tr>
					          <tr>
					              <td>
					              	  <span class="important">参与对象：</span>
					                  <select class="txt" id="targetType" name="targetType">
										<option value="1">所有人</option>
										<option value="2">所有辅导员</option>
										<option value="3">所有少先队员</option>
									 </select>
					              </td>
					          </tr>
					          <tr>
					              <td>
					              	  <span>&nbsp;&nbsp;&nbsp;活动奖章：</span>
					                  <select class="txt" id="medalId" name="medalId">
					                  	<option value="">请选择活动奖章</option>
											<option value="活动奖章">活动奖章</option>
									 </select>
					              </td>
					          </tr>
					          <tr>
					              <td><span class="important">活动时间：</span>
					                <input id="startTime" name="startTime" value="" placeholder="开始时间" type="text" class="time" style="width: 188px!important" maxlength="10" readonly="readonly">
					                <input id="endTime" name="endTime" value="" readonly="readonly" placeholder="结束时间" type="text" class="time" style="width: 188px!important" maxlength="10" data-enable-time=true  data-enable-seconds=true>
					              </td>
					          </tr>
					          <tr>
					           <td colspan="3">
					                 <span class="important">活动头图：（最多可上传6张图片）</span>
					                  <div id="file_upload" class="upload_div upfile"></div>
					                  <input type="hidden" name="imgs" id="imgs" value="">
					           </td>
							  </tr>
					      </tbody></table>

					      <!-- <div class="hello">
							    <div class="upload">
							      <div class="upload_warp">
							        <div class="upload_warp_left" @click="fileClick">
							          <img src="./upload.png">
							        </div>
							        <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
							          或者将文件拖到此处
							        </div>
							      </div>
							      <div class="upload_warp_text">
							        选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
							      </div>
							      <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
							      <div class="upload_warp_img" v-show="imgList.length!=0">
							        <div class="upload_warp_img_div" v-for="(item,index) of imgList">
							          <div class="upload_warp_img_div_top">
							            <div class="upload_warp_img_div_text">
							              {{item.file.name}}
							            </div>
							            <img src="./del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
							          </div>
							          <img :src="item.file.src">
							        </div>
							      </div>
							    </div>
						  </div> -->

					  </div>
				</form>
				  <div class="commit-box">
					  <button class="btn no" id="callbackBtn" onclick="callback()">返回</button>
				      <button class="btn yes" id="submitBtn" onclick="save()">保存</button>
				  </div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import leftMenu from '@/components/common/leftMenu'//左侧
export default {
	data () {
      return {
        imgList: [],
        size: 0
      }
    },
    mounted(){
    	this.dateDefind();
    },
    methods: {
          fileClick() {
              document.getElementById('upload_file').click()
          },
          fileChange(el) {
              if (!el.target.files[0].size) return;
              this.fileList(el.target);
              el.target.value = ''
          },
          fileList(fileList) {
              let files = fileList.files;
              for (let i = 0; i < files.length; i++) {
                  //判断是否为文件夹
                  if (files[i].type != '') {
                      this.fileAdd(files[i]);
                  } else {
                      //文件夹处理
                      this.folders(fileList.items[i]);
                  }
              }
          },
          //文件夹处理
          folders(files) {
              let _this = this;
              //判断是否为原生file
              if (files.kind) {
                  files = files.webkitGetAsEntry();
              }
              files.createReader().readEntries(function (file) {
                  for (let i = 0; i < file.length; i++) {
                      if (file[i].isFile) {
                          _this.foldersAdd(file[i]);
                      } else {
                          _this.folders(file[i]);
                      }
                  }
              })
          },
          foldersAdd(entry) {
              let _this = this;
              entry.file(function (file) {
                  _this.fileAdd(file)
              })
          },
          fileAdd(file) {
              //总大小
              this.size = this.size + file.size;
              //判断是否为图片文件
              if (file.type.indexOf('image') == -1) {
                  file.src = 'wenjian.png';
                  this.imgList.push({
                      file
                  });
              } else {
                  let reader = new FileReader();
                  reader.vue = this;
                  reader.readAsDataURL(file);
                  reader.onload = function () {
                      file.src = this.result;
                      this.vue.imgList.push({
                          file
                      });
                  }
              }
          },
          fileDel(index) {
              this.size = this.size - this.imgList[index].file.size;//总大小
              this.imgList.splice(index, 1);
          },
          bytesToSize(bytes) {
              if (bytes === 0) return '0 B';
              let k = 1000, // or 1024
                  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                  i = Math.floor(Math.log(bytes) / Math.log(k));
              return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
          },
          dragenter(el) {
              el.stopPropagation();
              el.preventDefault();
          },
          dragover(el) {
              el.stopPropagation();
              el.preventDefault();
          },
          drop(el) {
              el.stopPropagation();
              el.preventDefault();
              this.fileList(el.dataTransfer);
          },
	      dateDefind(){
/*	        var self=this;
	        $('.form_date').datetimepicker({
	          language:'zh-CN',
	          format:'yyyy-mm-dd hh:mm:ss',
	          weekStart: 1,
	          todayBtn:  1,
	          autoclose: 1,
	          todayHighlight: 1,
	          startView: 2,
	          minView: 0,
	          minuteStep:1,
	          forceParse: 0
	        }),
	        $('.form_date').datetimepicker()
	        .on('hide',function(e){
	          self.settimeInput=$('.settime-input').val();
	        })
*/console.log(1213);
	        $(".time").datetimepicker2({
				changeYear : true,
				changeMonth : true,
				showSecond : true,
				timeFormat : 'hh:mm:ss',
				dateFormat : 'yy-mm-dd',
				stepHour : 1,
				stepMinute : 1,
				stepSecond : 1
			});
	    }
    },
   	components: {
      'l-menu':leftMenu
   	}
}
</script>
<style scoped lang="scss">
.addCont{
	padding: 20px;
	margin-left:16%;
	box-sizing: border-box;
	background:#f7f7f7;
}
.addTitle{font-size: 16px;font-weight: 600;}
.addTab table{width: 100%;box-sizing: border-box;margin: 10px 0;}
.addTab td{background: #f7f7f7;padding:5px 0;font-size: 14px;}
.addTab tr td:nth-child(odd){height:30px;vertical-align: top;padding-left: 10px;}
.addTab tr td:nth-child(odd)>span{white-space:nowrap;display: inline-block;color: #555A5D;line-height: 30px;}
.addTab .important:before{color: red;content: "*";padding-right: 5px;}
.addTab tr td:nth-child(even){width: 100%;}
.addTab td input[type="text"]{width:100%;font-size: 14px;vertical-align: middle;background:#fff;border:1px solid #ddd;padding:3px 5px;height:30px;line-height:100%; box-sizing:border-box;border-radius: 3px;}
.addTab input[type="radio"]{margin-right: 3px;width:15px;height:15px;}
.addTab input[type="checkbox"]{margin-right: 3px;vertical-align: -2px;}
.addTab td textarea{box-sizing:border-box;padding:6px 5px;font-size: 14px;width: 100%;border:1px solid #ddd;line-height: 18px;overflow-y:auto;background: #fff;box-sizing: border-box;border-radius: 3px;}
.addTab .btn-radio span{padding-right: 10px;}
.addTab .tit2{border-left:4px solid #2BC2F4;margin:10px 0;padding-left: 10px;line-height: 120%;}
.txt {
	border: 1px solid #D9D9D9;
	border-top: 1px solid silver;
	padding: 7px 10px;
	width: 180px;
	background-color: #FFFFFF;
	border-radius: 2px;
	margin:3px 0;
/*	font-size:12px;*/
}
.commit-box{text-align: center;margin: 0px auto;width:500px;padding: 20px;}
.commit-box .btn,.save{font-size:16px;padding:0; border-radius: 2px;background: #FF6B6B;color: #fff;width:160px;line-height:40px;height:40px;text-align: center;display: inline-block;margin: 0 10px;cursor: pointer;border: 0;}
.commit-box .btn.no{background: #CDCDCD;width: 100px;}
.commit-box .btn.yes{background: #63a8eb;width: 100px;}

    .upload_warp_img_div_del {
      position: absolute;
      top: 6px;
      width: 16px;
      right: 4px;
    }

    .upload_warp_img_div_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.4);
      line-height: 30px;
      text-align: left;
      color: #fff;
      font-size: 12px;
      text-indent: 4px;
    }

    .upload_warp_img_div_text {
      white-space: nowrap;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .upload_warp_img_div img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }

    .upload_warp_img_div {
      position: relative;
      height: 100px;
      width: 120px;
      border: 1px solid #ccc;
      margin: 0px 30px 10px 0px;
      float: left;
      line-height: 100px;
      display: table-cell;
      text-align: center;
      background-color: #eee;
      cursor: pointer;
    }

    .upload_warp_img {
      border-top: 1px solid #D2D2D2;
      padding: 14px 0 0 14px;
      overflow: hidden
    }

    .upload_warp_text {
      text-align: left;
      margin-bottom: 10px;
      padding-top: 10px;
      text-indent: 14px;
      border-top: 1px solid #ccc;
      font-size: 14px;
    }

    .upload_warp_right {
      float: left;
      width: 57%;
      margin-left: 2%;
      height: 100%;
      border: 1px dashed #999;
      border-radius: 4px;
      line-height: 130px;
      color: #999;
    }

    .upload_warp_left img {
      margin-top: 32px;
    }

    .upload_warp_left {
      float: left;
      width: 40%;
      height: 100%;
      border: 1px dashed #999;
      border-radius: 4px;
      cursor: pointer;
    }

    .upload_warp {
      margin: 14px;
      height: 130px;
    }

    .upload {
      border: 1px solid #ccc;
      background-color: #fff;
      width: 650px;
      box-shadow: 0px 1px 0px #ccc;
      border-radius: 4px;
    }

    .hello {
      width: 650px;
      margin-left: 34%;
      text-align: center;
    }
</style>