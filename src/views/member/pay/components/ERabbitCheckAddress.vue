<script>
export default {
  name: 'ERabbitCheckAddress',
};
</script>
<script setup></script>
<template>
  <div class="er-checkout-address">
    <div class="text">
      <ul>
        <li><span>收货人：</span>张三</li>
        <li><span>联系方式：</span>18888888888</li>
        <li><span>收货地址：</span>山东省菏泽市牡丹区</li>
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <ERabbitButton class="btn" style="margin-right: 10px"
        >修改地址</ERabbitButton
      >
      <ERabbitButton class="btn">添加地址</ERabbitButton>
    </div>
  </div>
</template>
<style scoped lang="less">
.er-checkout-address {
  display: flex;
  padding: 20px;
  border: 1px solid #f5f5f5;
  .text {
    flex: 2;
    display: flex;
    ul {
      flex: 3;
      li {
        height: 30px;
        span {
          color: #999;
        }
      }
    }
    a {
      flex: 1;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      color: @erColor;
    }
  }
  .action {
    flex: 1;
    height: 90px;
    line-height: 90px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      font-size: 14px;
    }
  }
}
</style>
