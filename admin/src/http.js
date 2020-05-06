import axios from 'axios'
import Vue from 'vue'
import router from '../src/router/index'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/'
  // baseURL: 'http://localhost:3000'
})
// 每个axios请求前都会进入这个函数
http.interceptors.request.use(function (config) { 
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// 每个axios从后端返回时都会进入这个函数
http.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err)
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

export default http