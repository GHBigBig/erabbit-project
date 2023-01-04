<script>
export default {
  name: 'ERabbitLoginCallback',
  components: {
    ERabbitLoginHeader,
    ERabbitLoginFooter,
    ERabbitLoginCallbackBind,
  },
};
</script>
<script setup>
import { ref } from 'vue';
import ERabbitCallbackLoginPatch from './components/ERabbitCallbackLoginPatch.vue';
import ERabbitLoginCallbackBind from './components/ERabbitLoginCallbackBind.vue';
import ERabbitLoginFooter from './components/ERabbitLoginFooter.vue';
import ERabbitLoginHeader from './components/ERabbitLoginHeader.vue';

const hasAccount = ref(true);
const nickname = ref(null);
const avatar = ref(null);
</script>

<template>
  <ERabbitLoginHeader>联合登录</ERabbitLoginHeader>
  <main class="container">
    <nav class="tab-header">
      <ul>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-bind"></i>
            <span>已有小兔鲜账号，请绑定手机</span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-edit"></i>
            <span>没有小兔鲜账号，请完善资料</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- <div class="tab-content">
      <ERabbitLoginCallbackBind></ERabbitLoginCallbackBind>
    </div> -->
    <div class="tab_content">
      <ERabbitCallbackLoginPatch></ERabbitCallbackLoginPatch>
    </div>
  </main>
  <ERabbitLoginFooter></ERabbitLoginFooter>
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
  .tab-header {
    height: 80p;
    padding-top: 40px;
    font-size: 18px;
    text-align: center;
    background-color: #fff;
    ul {
      display: flex;
      justify-content: center;
      li {
        a {
          width: 350px;
          line-height: 40px;
          border-bottom: 2px solid @erColor;
          display: inline-block;
          color: #666;

          i {
            font-size: 22px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .tab-content {
    min-height: 600px;
    background: #fff;
  }
}
</style>
