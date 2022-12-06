<script setup>
import ERabbitGoodsRecommend from './components/ERabbitGoodsRecommend.vue';

</script>
<template>
  <div class="er-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <ERabbitBread>
        <ERabbitBreadItem></ERabbitBreadItem>
        <ERabbitBreadItem></ERabbitBreadItem>
        <ERabbitBreadItem></ERabbitBreadItem>
        <ERabbitBreadItem></ERabbitBreadItem>
      </ERabbitBread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
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
<style scoped lang="less"></style>
