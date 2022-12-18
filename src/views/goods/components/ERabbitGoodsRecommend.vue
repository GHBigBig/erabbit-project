<script>
export default {
  name: 'ERabbitGoodsRecommend',
};
</script>
<script setup>
import { ref } from 'vue';
import { findRelGoods } from '@/api/goods';

const props = defineProps({
  goodsId: {
    type: String,
  },
});

const slider = ref([]);
const useFindRelGoods = (id) => {
  findRelGoods(id).then((data) => {
    const size = 4;
    const total = Math.ceil(data.result.length / 4);
    for (let i = 0; i < total; i++) {
      slider.value[i] = data.result.slice(i * size, (i + 1) * size);
    }
  });
};
useFindRelGoods(props.goodsId);
</script>
<template>
  <div class="goods-recommend">
    <div class="header">
      <i class="icon"></i>
      <span class="title">
        {{ props.goodsId ? '同类商品推荐' : '猜你喜欢' }}
      </span>
    </div>
    <ERabbitCarousel :sliders="slider"></ERabbitCarousel>
  </div>
</template>
<style scoped lang="less">
.goods-recommend {
  background-color: #fff;
  height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      box-sizing: border-box;
      border-top: 4px solid @erColor;
      border-right: 4px solid @erColor;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background-color: lighten(@erColor, 40%);
      }
    }
  }
}

:deep(.er-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @erColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
        font-weight: bolder;
      }
    }
  }
}
</style>
