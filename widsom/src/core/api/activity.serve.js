import request from "./config/http.js"

var url1 = 'ypm/activityManageList'; //活动管理条件查询
var url2 = 'ypm/medalList'; //奖章设置查询

var apis = {
  activityManageList,
  medalList,
  getQueryByPage
}

function activityManageList(manageType,pageNum,status,title){
	var data = {
	    managerTypeSer: manageType,//发起类型
	    page: pageNum,//页码
	    statusSer:status,//活动状态
	    titleSer:title,//活动标题
    }
    return request("GET", url1, data).then((resault) => {
	    return Promise.resolve(resault);
    });
}

function medalList(pageNum){//奖章设置查询
	var data = {
	    page:pageNum
    }
    return request("GET", url2, data).then((resault) => {
	    return Promise.resolve(resault);
    });
}

function getQueryByPage(targetType,stage,curPage,pageSize) { //模块查询
  var data = {
    targetType:targetType,
    stage:stage,
    curPage:curPage,
    pageSize:pageSize
  }
  return request("GET", url1+"/queryByPage", data).then((resault) => {
    return Promise.resolve(resault);
  });
}
export default apis;