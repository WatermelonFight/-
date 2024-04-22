<script setup>
import { fetchHotGoodsAPI } from '@/apis/detail'
import { ref } from 'vue';
import { onMounted } from 'vue';
const props = defineProps({
  id:{
    type:String
  },
  type:{
    type:Number
  },
  limit:{
    type:Number
  }
})
// 模板里加上{{}}，script里要解构赋值（defineProps返回的是对象）
const {id,type,limit} = props
const HotGoods = ref([])

const getDetailsHot = async() => {
  const res = await fetchHotGoodsAPI({
    id,
    type,
    limit
  })
  HotGoods.value = res.result
  console.log(222,res);
}
onMounted( () => { getDetailsHot() })

//周/日榜方法2：
// const TITLEMAP = {
//   1: '24小时热榜',
//   2: '周热榜', 
// }
// const title = computed(() => TITLEMAP[props.type])

// <h3>{{ title }}</h3>
</script>


<template>
  <div class="goods-hot">
    <h3 v-if="type==2">周榜单</h3>
    <h3 v-else-if="type==1">24小时榜单</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in HotGoods" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>