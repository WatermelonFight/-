<script setup>
import { ref } from 'vue';
import { findHotAPI } from "@/apis/home.js";
import { onMounted } from "vue";
import HomePanel from './HomePanel.vue'

const hotList = ref([])
const getHotList = async () => {
    const res = await findHotAPI()
    hotList.value = res.result
}
onMounted(()=>{
    getHotList()
})
</script>

<template>
  <div>
    <HomePanel title="人气推荐" subTitle="人气推荐 不容错过">
        <ul class="goods-list">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img v-img-lazy="item.picture" alt="" />
        <p class="title">{{ item.title }}</p>
        <p class="alt">{{ item.alt }}</p>
      </RouterLink>
    </li>
  </ul>
    </HomePanel>
  </div>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .alt {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>