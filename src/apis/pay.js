import request from '@/utils/http'

//获取支付页面数据
export const getOrderAPI = (id) => {
    return request({
        url:`/member/order/${id}`
    })
}