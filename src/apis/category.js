//由于是默认导出，所以变量可以自由命名
import request from '@/utils/http'


export function getCategoryAPI(id){
    return request({
        url:'/category',
        params:{
            id
        }
    })
}