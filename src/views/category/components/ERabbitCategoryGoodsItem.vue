<script setup>
const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <RouterLink to="/" class="goods-item">
    <img
      :src="props.goods.picture"
      :data-src="props.goods.picture"
      alt="分类商品图片"
    />
    <p class="name ellipsis">{{ props.goods.name }}</p>
    <p class="desc ellipsis">{{ props.goods.tag }}</p>
    <p class="price">&yen;{{ props.goods.price }}</p>
  </RouterLink>
</template>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
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
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
