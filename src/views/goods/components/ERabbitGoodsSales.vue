<script>
export default {
  name: 'ERabbitGoodsSales',
};
</script>
<script setup>
const props = defineProps({
  goods: {
    type: Object,
    require: true,
  },
});
</script>
<template>
  <ul class="goods-sales">
    <li>
      <p>销量人气</p>
      <p>{{ props.goods.salesCount }}</p>
      <p><i class="iconfont icon-task-filling"></i>销量人气</p>
    </li>
    <li>
      <p>商品评价</p>
      <p>{{ props.goods.commentCount }}</p>
      <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
    </li>
    <li>
      <p>收藏人气</p>
      <p>{{ props.goods.collectCount }}</p>
      <p><i class="iconfont icon-favorite-filling"></i>收藏人气</p>
    </li>
    <li>
      <p>品牌信息</p>
      <p>{{ props.goods.brand.name }}</p>
      <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
    </li>
  </ul>
</template>
<style scoped lang="less">
.goods-sales {
  width: 400px;
  height: 140px;
  display: flex;
  align-items: center;
  text-align: center;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      content: '';
      height: 60px;
      border-left: 1px solid #e4e4e4;
      position: absolute;
      top: 10px;
      left: 0;
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @erColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @erColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @erColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
