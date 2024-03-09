//封装有关用户请求的API
import request from '@/utils/http.js'

export const loginAPI = ({account,password}) => {
    return request({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}