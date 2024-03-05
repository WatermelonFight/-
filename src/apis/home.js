import httpInstance from '@/utils/http.js'
//默认导出时导入不能加{}

export function getBannerAPI(params = {}) {
    //默认为1 商品为2
    const {distributionSite = '1'} = params
    return httpInstance({
        url: '/home/banner',
        params:{
            //等同于distributionSite: distributionSite
            distributionSite
        }
    })
}


/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return httpInstance({
        url: '/home/new'
    })
}
//上面这个return在箭头函数里可以省略

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findHotAPI = () => {
    return httpInstance({
        url: '/home/hot'
    })
}

/**
 * @description: 获取货物列表
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
    return httpInstance({
        url: '/home/goods'
    })
}