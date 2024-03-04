//axios
import axios from "axios";

//创建实例
const httpInstance = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config =>{
    return config
},e =>Promise.reject(e))

//axios响应式拦截器
//res=>res.data是对res中的data部分进行提取，也就是处理相应对象，后面调用接口请求数据时无需再加.data
httpInstance.interceptors.response.use(res => res.data,e=>{
    return Promise.reject(e)
})

export default httpInstance