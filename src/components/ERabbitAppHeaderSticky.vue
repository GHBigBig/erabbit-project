<script setup>
import ERabbitAppHearderNav from './ERabbitAppHearderNav.vue';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();
</script>
<template>
  <div class="app-header-sticky" :class="{ show: y >= 103 }">
    <div class="container" v-show="y >= 103">
      <RouterLink class="logo" to="/"></RouterLink>
      <ERabbitAppHearderNav></ERabbitAppHearderNav>
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s all;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    padding-left: 40px;
    text-align: center;
    border-left: 2px solid @erColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @erColor;
      }
    }
  }
}
</style>
