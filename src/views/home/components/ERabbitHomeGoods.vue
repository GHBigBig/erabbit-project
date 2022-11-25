<script setup>
const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
</script>
<template>
  <div class="goods-item">
    <RouterLink to="/" class="image">
      <img alt="商品图片" v-lazyload="props.goods.picture" />
    </RouterLink>
    <p class="name ellipsis-2">{{ props.goods.name }}</p>
    <p class="desc">{{ props.goods.tag }}</p>
    <p class="price">&yen;{{ props.goods.price }}</p>
    <div class="extra">
      <RouterLink to="/">
        <span>找相似</span>
        <span>发现更多宝贝 &gt;&gt;</span>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped lang="less">
.goods-item {
  width: 240px;
  height: 300px;
  padding: 10px 30px;
  border: 1px solid transparent;
  overflow: hidden;
  transform: all 0.5s;
  position: relative;

  img {
    display: block;
    width: 160px;
    height: 160px;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-top: 6px;
    font-size: 16px;
    &.name {
      height: 44px;
    }
    &.desc {
      height: 22px;
      color: #666;
    }
    &.price {
      color: @priceColor;
      margin-top: 10px;
      font-size: 20px;
    }
  }
  .extra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 86px;
    width: 100%;
    background: @erColor;
    text-align: center;
    transition: all 0.5s;
    transform: translateY(100%);

    span {
      display: block;
      width: 120px;
      margin: 0 auto;
      line-height: 30px;
      color: #fff;
      &:first-child {
        font-size: 18px;
        line-height: 40px;
        margin-top: 5px;
        border-bottom: 1px solid #fff;
      }
    }
  }

  &:hover {
    border-color: @erColor;
    .extra {
      transform: none;
    }
  }
}
</style>
