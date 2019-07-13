import Vue from 'vue'
import axios from 'axios'

const baseURL ="http://test2.inside.mexue.com";
const service = axios.create({
  baseURL,
  timeout: 10000
});

//const service=axios;
function request(type,url,data) {
  var type=type.toUpperCase();
  if(type=="GET"){
     return service.get(url,{
      params:data||""
    })
    .then((response)=>{
       return Promise.resolve(response.data);
    })
    .catch((error)=>{
      return Promise.reject(error);
    });
  }
  if(type=="POST"){
    var params = new URLSearchParams();
    for(var n in data){
       params.append(n, data[n]);
    }
   return service.post(url,params||"")
    .then((response)=>{
       return Promise.resolve(response.data);
    })
    .catch((error)=>{
      return Promise.reject(error);
    });
  }
}

export default request;
