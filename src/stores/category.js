import { defineStore } from "pinia";
import { getCategoryAPI} from '@/apis/Layout'
import { ref } from 'vue'


//错误示范：生命周期钩子只能在 setup() 函数内部使用
// onMounted(()=>{
//     useCategoryStore()
// })
// export const useCategoryStore = defineStore('category',async () =>{
//     const getList = ref([])
//     const res = await getCategoryAPI()
//     getList.value = res.result
//     return { getList }
// })
export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])
    const getCategory = async ()=>{
        const res = await getCategoryAPI()
        categoryList.value = res.result
        console.log(categoryList.value);
    }
    return { categoryList, getCategory }
  })