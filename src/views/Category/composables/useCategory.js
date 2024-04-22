//封装分类数据业务相关代码
import { onMounted, ref } from 'vue'
import { getCategoryAPI } from '@/apis/category';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export const useCategory = () => {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async(id=route.params.id) =>{
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
    // console.log(res);
}
onMounted(()=>{
    getCategory()
})
//目标：路由参数发生变化时，重新发送分类数据接口（此处也可用watch监听路由）
//路由缓存问题：路由只有参数变化时，会复用组件实例
onBeforeRouteUpdate((to)=>{
    getCategory(to.params.id)
    // console.log(to);
  })
return {
    categoryData
}
}
