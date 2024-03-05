import  httpInstance  from '@/utils/http.js'
//默认导出时导入不能加{}

export function  getBannerAPI(){
    return httpInstance({
        url:'/home/banner'
    })
}
