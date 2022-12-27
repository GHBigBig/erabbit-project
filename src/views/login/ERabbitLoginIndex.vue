<script>
export default {
  name: 'ERabbitLoginIndex',
};
</script>
<script setup>
import { ref } from 'vue';
import ERabbitLoginFooter from './components/ERabbitLoginFooter.vue';
import ERabbitLoginHeader from './components/ERabbitLoginHeader.vue';

const activeName = ref('account');
</script>
<template>
  <div class="page-login">
    <ERabbitLoginHeader></ERabbitLoginHeader>
    <main class="login-main">
      <div class="wrapper">
        <nav>
          <ul>
            <li>
              <a
                href="javascript:;"
                :class="{ active: activeName === 'account' }"
                @click="activeName = 'account'"
              >
                账户登录
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{ active: activeName === 'qrcode' }"
                @click="activeName = 'qrcode'"
              >
                扫码登录
              </a>
            </li>
          </ul>
        </nav>
        <div v-if="activeName === 'account'" class="account-box">表单登录</div>
        <div v-if="activeName === 'qrcode'" class="qrcode-box">
          <img src="../../assets/images/qrcode.jpg" alt="登录二维码" />
          <p>打开<a href="javascript:;">小兔鲜儿</a>扫码登录</p>
        </div>
      </div>
    </main>
    <ERabbitLoginFooter></ERabbitLoginFooter>
  </div>
</template>
<style scoped lang="less">
.login-main {
  height: 488px;
  background: url(../../assets/images/login-bg.png) no-repeat center/ cover;
  position: relative;
  .wrapper {
    width: 380px;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    nav {
      height: 55px;
      padding: 0 40px;
      border-bottom: 1px solid #f5f5f5;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        li {
          flex: 1;
          text-align: center;
          &:first-child {
            border-right: 1px solid #f5f5f5;
          }
          a {
            line-height: 1;
            font-size: 18px;
            display: inline-block;
            &.active {
              color: @erColor;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .qrcode-box {
    padding: 40px 0;
    text-align: center;
    p {
      margin-top: 20px;
      a {
        color: @erColor;
        font-size: 16px;
      }
    }
  }
}
</style>
