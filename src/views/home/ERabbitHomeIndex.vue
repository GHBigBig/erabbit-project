<script setup>
import ERabbitHomeCategory from './components/ERabbitHomeCategory.vue';
import ERabbitHomeBanner from './components/ERabbitHomeBanner.vue';
import ERabbitHomeNew from './components/ERabbitHomeNew.vue';
import ERabbitHomeHot from './components/ERabbitHomeHot.vue';
import ERabbitHomeBrand from './components/ERabbitHomeBrand.vue';
import ERabbitHomeProduct from './components/ERabbitHomeProduct.vue';
import ERabbitHomeSpecial from './components/ERabbitHomeSpecial.vue';
</script>
<template>
  <div class="home-entry">
    <div class="container">
      <ERabbitHomeCategory></ERabbitHomeCategory>
      <ERabbitHomeBanner></ERabbitHomeBanner>
      <ERabbitHomeNew></ERabbitHomeNew>
      <ERabbitHomeHot></ERabbitHomeHot>
      <ERabbitHomeBrand></ERabbitHomeBrand>
      <ERabbitHomeProduct></ERabbitHomeProduct>
      <ERabbitHomeSpecial></ERabbitHomeSpecial>
    </div>
  </div>
</template>
<style scoped lang="less"></style>
