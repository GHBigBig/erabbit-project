<script>
export default {
  name: 'ERabbitGoodsDetail',
};
</script>
<script setup>
import { inject } from 'vue';

const goods = inject('goods');
</script>
<template>
  <div class="goods-detail">
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <img
      v-for="item in goods.details.pictures"
      :key="item"
      :src="item"
      :data-src="item"
      alt="商品详情图片"
    />
  </div>
</template>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      width: 50%;
      margin-bottom: 10px;
      display: flex;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
