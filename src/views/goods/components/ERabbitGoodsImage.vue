<script>
export default {
  name: 'ERabbitGoodsImage',
};
</script>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const currIndex = ref([0]);
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

const position = reactive({ left: 0, top: 0 });
const bgPosition = reactive({ backgroundPositionX: 0, backgroundPositionY: 0 });

watch([elementX, elementY, isOutside], () => {
  if (elementX.value < 100) {
    position.left = 0;
  } else if (elementX.value > 300) {
    position.left = 200;
  } else {
    position.left = elementX.value - 100;
  }
  if (elementY.value < 100) {
    position.top = 0;
  } else if (elementY.value > 300) {
    position.top = 200;
  } else {
    position.top = elementY.value - 100;
  }

  bgPosition.backgroundPositionX = -position.left * 2 + 'px';
  bgPosition.backgroundPositionY = -position.top * 2 + 'px';

  position.top = position.top + 'px';
  position.left = position.left + 'px';
});
</script>
<template>
  <div class="goods-image">
    <div
      v-show="!isOutside"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, bgPosition]"
    ></div>

    <div class="middle" ref="target">
      <img :src="props.images[currIndex]" alt="商品图片" />
      <div class="layer" v-show="!isOutside" :style="position"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img :src="img" alt="商品缩略图" @mouseenter="currIndex = i" />
      </li>
    </ul>
  </div>
</template>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  display: flex;
  position: relative;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 501;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @erColor;
      }
    }
  }
}
</style>
