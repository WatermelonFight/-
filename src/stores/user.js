import { defineStore } from "pinia";
import {loginAPI} from '@/apis/user'
import { ref } from "vue";
import { useCartStore } from '@/stores/cartStore'
import { mergeCartAPI } from '@/apis/cart'
const useInfo = ref({})

export const useUserStore = defineStore('user',()=>{
    //需写在define..内,不然会出现getActivePinia()" was called but there was no active Pinia错误,这样才能保证拿到useCartStore()
    const useCart = useCartStore()
    const getUserInfo = async({account,password})=>{
        const res = await loginAPI({account,password})
        useInfo.value = res.result
        //登录时合并购物车
        await mergeCartAPI(useCart.cartList.map((item)=>{
            return{
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        useCart.updateCartList()
    }
    //退出登录时清除用户信息
    //由于使用了插件，所以localstore会与pinia同步
    const clearUserInfo = () => {
        useInfo.value={}
        useCart.clearCartList()
    }
    return {
        useInfo,getUserInfo,clearUserInfo
    }
},{
    persist:true
})