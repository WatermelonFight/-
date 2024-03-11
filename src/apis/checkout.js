import request from '@/utils/http'

//订单结算页面
export const getCheckoutAPI = () => {
    return request({
        url:'/member/order/pre'
    })
}

//创建订单
export const createOrderAPI = (data) => {
    return request({
        url:'member/order',
        method:'POST',
        data
    })
}