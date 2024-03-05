import httpInstance from '@/utils/http.js'
//默认导出时导入不能加{}

export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
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