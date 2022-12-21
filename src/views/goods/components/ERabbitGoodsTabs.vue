<script>
export default {
  name: 'ERabbitGoodsTabs',
};
</script>
<script setup>
import { inject, shallowRef } from 'vue';
import ERabbitGoodsComment from './ERabbitGoodsComment.vue';
import ERabbitGoodsDetail from './ERabbitGoodsDetail.vue';

const goods = inject('goods');

const activeComponent = shallowRef(ERabbitGoodsDetail);
</script>

<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        :class="{ active: activeComponent.name === 'ERabbitGoodsDetail' }"
        @click="activeComponent = ERabbitGoodsDetail"
        >商品详情</a
      >
      <a
        href="javascript:;"
        :class="{ active: activeComponent.name === 'ERabbitGoodsComment' }"
        @click="activeComponent = ERabbitGoodsComment"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <component :is="activeComponent"></component>
  </div>
</template>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background-color: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      span {
        margin-left: 10px;
        font-size: 16px;
        color: @priceColor;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          width: 72px;
          height: 2px;
          position: absolute;
          left: 40px;
          bottom: -1px;
          background-color: @erColor;
        }
      }
    }
  }
}
</style>
