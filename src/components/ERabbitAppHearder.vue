<script setup>
import ERabbitAppHearderNav from './ERabbitAppHearderNav.vue';
import ERabbitAppHeaderSticky from './ERabbitAppHeaderSticky.vue';
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
      <div class="cart">
        <a href="#" class="curr">
          <i class="iconfont icon-cart"></i>
          <em>2</em>
        </a>
      </div>
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
  .cart {
    position: relative;
    padding-left: 1rem;
    i {
      font-size: 1.5rem;
      line-height: 100%;
    }
    em {
      font-style: normal;
      font-size: 12px;
      color: #fff;
      background: @helpColor;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      padding: 0 0.5rem;
      border-radius: 10px;
    }
  }
}
</style>
