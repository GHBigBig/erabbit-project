<script setup>
import { findGoods } from '@/api/product';
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ERabbitGoodsRecommend from './components/ERabbitGoodsRecommend.vue';

const goods = ref(null);
const route = useRoute();

watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then((data) => {
        goods.value = null; //结合 v-if 使组件可以重新销毁和创建
        nextTick(() => {
          goods.value = data.result;
        });
        goods.value = data;
      });
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="er-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <ERabbitBread>
        <ERabbitBreadItem to="/">首页</ERabbitBreadItem>
        <ERabbitBreadItem :to="`/category/${goods.categories[0].id}`">
          {{ goods.categories[0].name }}
        </ERabbitBreadItem>
        <ERabbitBreadItem :to="`/category/sub/${goods.categories[1].id}`">
          {{ goods.categories[1].name }}
        </ERabbitBreadItem>
        <ERabbitBreadItem>{{ goods.name }}</ERabbitBreadItem>
      </ERabbitBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media"></div>
        <div class="spec"></div>
      </div>
      <!-- 推荐商品 -->
      <ERabbitGoodsRecommend></ERabbitGoodsRecommend>
      <div class="goods-footer">
        <!-- 商品详情 -->
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tab"></div>
          <div class="goods-warn"></div>
        </div>
        <!-- 热榜 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.goods-info {
  min-height: 600px;
  display: flex;
  background-color: #fff;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px;
    padding-left: 0;
  }
}
</style>
