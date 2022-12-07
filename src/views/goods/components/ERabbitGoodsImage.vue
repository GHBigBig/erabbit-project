<script setup>
import { ref } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const currIndex = ref([0]);
</script>
<template>
  <div class="goods-image">
    <div class="middel">
      <img :src="props.images[currIndex]" alt="商品图片" />
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
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
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
