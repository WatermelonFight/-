import { defineStore } from "pinia";
import {loginAPI} from '@/apis/user'
import { ref } from "vue";

const useInfo = ref({})
export const useUserStore = defineStore('user',()=>{
    const getUserInfo = async({account,password})=>{
        const res = await loginAPI({account,password})
        useInfo.value = res.result
    }
    //退出登录时清除用户信息
    //由于使用了插件，所以localstore会与pinia同步
    const clearUserInfo = () => {
        useInfo.value={}
    }
    return {
        useInfo,getUserInfo,clearUserInfo
    }
},{
    persist:true
})