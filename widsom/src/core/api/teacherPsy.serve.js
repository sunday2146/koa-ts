
import request from "./config/http.js"


var dev=""; 
var url1=dev+"/web/module";
var url2=dev+"/web/loopImg";
var url3=dev+"/psychology/qaWeb";//教师测评
var url4=dev+"/rest/basic/validateLogin";


var apis = {
  validateLogin,//登录验证
  getTestRecords,//教师测评列表
  getTestAlertRecords,//教师测评列表预警
  getFeedBack,//教师测评详情
  getQuestionaires,//教师测评问卷名称
}
function validateLogin(isAdmin) {
  var data = {
    isAdmin:isAdmin,
  }
  return request("GET", url4, data).then((resault) => {
    return Promise.resolve(resault);
  });
}
function getTestRecords(schoolId,pageNum,pageSize,search) {
  var data = {
    schoolId:schoolId,
    pageNum:pageNum,
    pageSize:pageSize,
    userName:search.userName,
    qaId:search.qaId,
    startTime:search.startTime,
    endTime:search.endTime
  }
  return request("POST", url3+"/getTestRecords", data).then((resault) => {
    return Promise.resolve(resault);
  });
}
function getTestAlertRecords(schoolId,pageNum,pageSize,search) {
  var data = {
    schoolId:schoolId,
    pageNum:pageNum,
    pageSize:pageSize,
    userName:search.userName,
    qaId:search.qaId,
    startTime:search.startTime,
    endTime:search.endTime
  }
  return request("POST", url3+"/getTestAlertRecords", data).then((resault) => {
    return Promise.resolve(resault);
  });
}
function getFeedBack(testId) {
  var data = {
    testId:testId,
  }
  return request("POST", url3+"/getFeedBack", data).then((resault) => {
    return Promise.resolve(resault);
  });
}
function getQuestionaires(){
  var data = {}
  return request("POST", url3+"/getQuestionaires", data).then((resault) => {
    return Promise.resolve(resault);
  });
}

export default apis
