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

export const getLikeListAPI = ({limit = 4}) => {
    return request({
        url:'/goods/relevant',
        params:{
            limit
        }
    })
}