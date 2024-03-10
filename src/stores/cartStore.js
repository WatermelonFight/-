import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI } from "@/apis/cart";
import { findNewCartListAPI } from "@/apis/cart";
import { delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore('cart',()=>{
    const userStore = useUserStore()
    // computed能够实现数据的动态计算和响应式更新
    const isLogin = computed(()=>userStore.useInfo.token)
    const cartList = ref([])
    //异步函数不能这样写
    // const insertCart = insertCartAPI()
    // const findNewCartList = findNewCartListAPI()

    //更新购物列表
    const updateCartList = async() => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    //添加到购物车
    const addCart = async(goods) => { 
        //add逻辑
        const { skuId,count } = goods
        if(isLogin.value){
            //登录后
            await insertCartAPI({skuId,count})
            updateCartList()
        }else{
            const item = cartList.value.find((item) =>  item.skuId === goods.skuId )
            if(item){
                item.count = item.count + goods.count
            }else{
                cartList.value.push(goods)
            }
        }

    }
    //购物车删除
    const delCart = async(skuId) => {
        //删除逻辑：1.找出删除对象的下标，然后使用splice删除数组元素
                 // 2.使用filter过滤
        if(isLogin.value){
            await delCartAPI([skuId])
            updateCartList()
        }else{
            const idx = cartList.value.findIndex((item) => item.skuId === skuId)
            cartList.value.splice(idx,1)
        }
    }

    //清除购物车数据
    const clearCartList = () => {
        cartList.value = []
    }
    

    //计算属性
    // computed 属性用于声明计算属性，这些属性是基于它们的依赖进行缓存的。
    const allCount = computed(() => cartList.value.reduce( (a,c) => a + c.count,0)) 
    const allPrice = computed(() => cartList.value.reduce((a,c)=>a+c.price*c.count,0))
    const selectedCount = computed(() => cartList.value.filter((item)=>item.selected).reduce( (a,c) => a + c.count,0))
    const selectedPrice = computed(() => cartList.value.filter((item)=>item.selected).reduce( (a,c) => a + c.count * c.price,0))

    //商品单选
    const singleCheck = (skuId,selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 商品全选
    const isAll = computed(()=>cartList.value.every((item)=>item.selected))
    const allCheck = (selected) => {
        cartList.value.forEach((item)=>item.selected=selected)
    }


    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        updateCartList,
        clearCartList,
        addCart,
        delCart,
        singleCheck,
        allCheck
    }
},{
    persist:true
})