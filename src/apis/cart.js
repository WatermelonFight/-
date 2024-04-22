//封装购物车相关接口
import request from '@/utils/http.js'

//插入
export const insertCartAPI = ({ skuId,count }) => {
    return request({
        url:'/member/cart',
        method:'POST',
        data:{
            skuId,
            count
        }
    })
}

//获取
export const findNewCartListAPI = () => {
    return request({
        url:'/member/cart'
    })
}

//删除
export const delCartAPI = (ids) => {
    return request({
        url:'/member/cart',
        method:'DELETE',
        data:{
            ids
        }
    })
}

//合并购物车
export const mergeCartAPI = (data) => {
    return request({
        url:'/member/cart/merge',
        method:'POST',
        data
    })
}