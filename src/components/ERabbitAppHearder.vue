<script setup>
import ERabbitAppHearderNav from './ERabbitAppHearderNav.vue';
import ERabbitAppHeaderSticky from './ERabbitAppHeaderSticky.vue';
import ERabbitAppHeaderCart from './ERabbitAppHeaderCart.vue';
</script>
<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <ERabbitAppHearderNav></ERabbitAppHearderNav>

      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="search" placeholder="搜一搜" />
      </div>
      <ERabbitAppHeaderCart></ERabbitAppHeaderCart>
    </div>
    <ERabbitAppHeaderSticky></ERabbitAppHeaderSticky>
  </header>
</template>

<style scoped lang="less">
.app-header {
  width: 100%;
  background: #fff;
}
.container {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -999px; //属性能定义一个块元素首行文本内容之前的缩进量。
      background: url(../assets/images/logo.png) no-repeat center / contain;
    }
  }

  .search {
    border-bottom: 1px solid #e7e7e7;
    height: 32px;
    line-height: 32px;
    i {
      font-size: 18px;
    }
    input {
      padding-left: 5px;
      width: 140px;
    }
  }
}
</style>
