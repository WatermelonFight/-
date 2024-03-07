<script setup>
import { getCategoryFilterAPI,getSubCategoryAPI } from '@/apis/category.js'
import { useRoute } from 'vue-router'
import { ref,onMounted } from 'vue'
import  GoodsItems  from '@/views/Home/components/GoodsItems.vue'

//获取二级分类面包屑导航数据
const route = useRoute()
const categoryData = ref({})
const getCategory = async (id) => {
    const res = await getCategoryFilterAPI(id)
    categoryData.value = res.result
    console.log(111,res);
}
onMounted(() =>  { getCategory(route.params.id) } )

//获取二级分类列表数据
const goodList = ref([])
const reqData = ref({
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField: 'publishTime'
})
const getGoodList = async() => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items
  console.log(222,res);
}
onMounted(()=>{getGoodList()})

//tab切换
const tabChange = () => {
  //万一某个tab下加载了很多页
  reqData.value.page = 1
  getGoodList()
}

//列表无限加载
const disabled = ref(false)
const load = async () => {
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  //新老数据拼接
  goodList.value = [...goodList.value,...res.result.items]
  if(res.result.items.length === 0){
    disabled.value = true
  }
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container" >
      <!-- ref在模板里不用.value -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange()">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
        <GoodsItems v-for="good in goodList" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>