<script>
export default {
  name: 'ERabbitLoginHeader',
};
</script>

<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜儿</RouterLink></h1>
      <h3 class="sub"><slot>欢迎登录</slot></h3>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang="less">
.login-header {
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 200px;
      a {
        width: 100%;
        height: 132px;
        display: block;
        text-indent: -9999px;
        background: url(../../../assets/images/logo.png) no-repeat center 18px /
          contain;
      }
    }
    .sub {
      font-size: 24px;
      font-weight: normal;
      color: #666;
    }
    .entry {
      width: 200px;
      font-size: 16px;
      i {
        font-size: 14px;
        color: @erColor;
        letter-spacing: -5px;
      }
    }
  }
}
</style>
