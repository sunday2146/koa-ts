import global from '@/core/global/global'
var param = global.global.getParam();
console.log(param);

const params = {
  userId: param.userId || "",
  userName: param.userName || "",
  mobile: param.mobile || "",
  schoolId: param.schoolId || "",
  schoolName: param.schoolName || ""
}
export default params;
