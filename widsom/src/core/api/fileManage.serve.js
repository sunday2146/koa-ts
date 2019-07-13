import request from "./config/http.js"


var dev=""; 
// var dev = "/apis";
var url1 = dev + '/yb/ybFiles/getFilesAll'; //获取年份接口
var url6 = dev + '/yb/ybFiles/getYbFilesByYear' //获取文件夹列表
var url3 = dev + '/yb/ybFiles/saveYear'; //添加年份接口

var url5 = dev + '/yb/ybFiles/saveFiles'; //添加文件夹接口

var url7 = dev + '/yb/ybFiles/deleteById'; //删除文件接口
var url8 = dev + '/yb/ybFiles/updateFiles'; //编辑接口
var url9 = dev + '/yb/ybFiles/getFiles'; //关联文件,根据id查询

var url11 = dev + '/yb/ybFiles/saveFileIds';


var url10 = dev + '/yb/ybFiles/getArctileByTitle' //关联文件,根据标题查询
var url12 = dev + '/yb/ybFiles/deleteFileId';

var apis = {
  getFilesAll,
  addYears,
  // getYears,
  getFiles,
  addNewFiles,
  delFile,
  editFile,
  relationFile,
  saveFileIds,
  relationSearchFile,
  deleteFileId
}

function getFilesAll() { //获取年份数据
  return request("GET", url1).then((resault) => {
    return Promise.resolve(resault);
  });
}

function addYears(year) { //添加年份
  var data = {
    year: year
  }
  return request("POST", url3, data).then((resault) => {
    return Promise.resolve(resault);
  });
}


function getFiles(year) { //根据年份获取文件夹列表
  var data = {
    year: year
  }
  return request("GET", url6, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function addNewFiles(yearId, fileName) { //添加文件夹
  var data = {
    yearId: yearId,
    fileName: fileName
  }
  return request("POST", url5, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function delFile(fileId) { //删除文件
  var data = {
    id: fileId,
  }
  return request("POST", url7, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function editFile(fileId, fileName) { //编辑
  var data = {
    id: fileId,
    fileName: fileName
  }
  console.log("fileId:" + data.id);
  return request("POST", url8, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function relationFile(searchFileId) { //关联文件查询
  var data = {
    id: searchFileId,
    pageNum: 1,
    pageSize: 9999
  }
  return request("POST", url9, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function relationSearchFile(title) { //根据标题查询文件
  var data = {
    title: title
  }
  return request("POST", url10, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function saveFileIds(id, fileIds) {
  var data = {
    id,
    fileIds
  }
  return request("POST", url11, data).then((resault) => {
    return Promise.resolve(resault);
  });
}

function deleteFileId(id, fileIds) {
  var data = {
    id,
    fileIds
  }
  return request("POST", url12, data).then((resault) => {
    return Promise.resolve(resault);
  });
}
export default apis
