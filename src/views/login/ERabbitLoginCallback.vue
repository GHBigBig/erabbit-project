<script>
export default {
  name: 'ERabbitLoginCallback',
};
</script>
<script setup>
import { ref } from 'vue';
import ERabbitCallbackLoginPatch from './components/ERabbitCallbackLoginPatch.vue';
import ERabbitLoginCallbackBind from './components/ERabbitLoginCallbackBind.vue';
import ERabbitLoginFooter from './components/ERabbitLoginFooter.vue';
import ERabbitLoginHeader from './components/ERabbitLoginHeader.vue';
import { userQQLogin } from '@/api/user';
import Message from '@/components/library/Message';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import QC from 'qc';

const store = useStore();
const router = useRouter();

const hasAccount = ref(true);

const isBind = ref(true); //用户QQ 是否已经绑定 系统账户
//默认用户QQ已经绑定了系统账户，会进行一次登录，根据登录结果判定默认是否成立
if (QC.Login.check()) {
  //检查 QQ 是否登录
  QC.Login.getMe((openId) => {
    userQQLogin(openId)
      .then((data) => {
        const { id, account, avatar, nickname, token, mobile } = data.result;
        store.commit('user/setUser', {
          id,
          account,
          avatar,
          nickname,
          token,
          mobile,
        });
        Message({ type: 'success', text: 'QQ登录成功' });
        router.push(store.state.user.redirectUrl);
      })
      .catch(() => {
        //失败原因 1. 没绑定小兔鲜帐号  2. 没有小兔鲜帐号
        isBind.value = false;
      });
  });
}
</script>

<template>
  <ERabbitLoginHeader>联合登录</ERabbitLoginHeader>
  <main v-if="!isBind" class="container">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </main>
  <main v-else class="container">
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
    <div v-if="hasAccount" class="tab-content">
      <ERabbitLoginCallbackBind></ERabbitLoginCallbackBind>
    </div>
    <div v-else class="tab_content">
      <ERabbitCallbackLoginPatch></ERabbitCallbackLoginPatch>
    </div>
  </main>
  <ERabbitLoginFooter></ERabbitLoginFooter>
</template>

<style scoped lang="less">
.container {
  height: 730px;
  padding: 25px 0;
  position: relative;

  .unbind {
    width: 100%;
    height: 100%;
    padding: 25px 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: url('@/assets/images/loadding.gif') no-repeat center / 100px
        100px;
    }
  }

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
