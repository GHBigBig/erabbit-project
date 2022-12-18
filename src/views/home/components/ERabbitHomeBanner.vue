<script setup>
import { findBanner } from '@/api/home';
import { ref } from 'vue';

const sliders = ref([]);
findBanner().then((data) => {
  sliders.value = data.result;
});
</script>
<template>
  <div class="home-banner">
    <ERabbitCarousel :sliders="sliders"></ERabbitCarousel>
  </div>
</template>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}

.er-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(.carousel-btn.indicator) {
    padding-left: 250px;
  }
}
</style>
