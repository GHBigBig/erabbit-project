<script>
export default {
  name: 'ERabbitLoginForm',
};
</script>
<script setup>
import { ref } from 'vue';

const isMsgLogin = ref(false);
const isAgree = ref(false);

const setParentActive = (e) => {
  e.target.parentNode.classList.add('active');
};
const cancelParentActive = (e) => {
  e.target.parentNode.classList.remove('active');
};
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <a
        v-if="isMsgLogin"
        href="javascript:;"
        @click="isMsgLogin = !isMsgLogin"
      >
        <i class="iconfont icon-user"></i>使用账户登录
      </a>
      <a v-else href="javascript:;" @click="isMsgLogin = !isMsgLogin">
        <i class="iconfont icon-user"></i>使用验证码登录
      </a>
    </div>
    <div class="form">
      <form novalidate autocomplete="off">
        <div v-if="!isMsgLogin">
          <div class="form-input-group">
            <label for="username"><i class="iconfont icon-user"></i></label>
            <input
              type="text"
              id="username"
              placeholder="请输入用户名"
              @focus="setParentActive"
              @blur="cancelParentActive"
            />
          </div>
          <div class="form-input-group">
            <label for="password"><i class="iconfont icon-msg"></i></label>
            <input
              type="password"
              id="password"
              @focus="setParentActive"
              @blur="cancelParentActive"
              placeholder="请输入密码"
            />
          </div>
        </div>
        <div v-else>
          <div class="form-input-group">
            <label for="tel"><i class="iconfont icon-user"></i></label>
            <input
              type="text"
              id="tel"
              placeholder="请输入手机号"
              @focus="setParentActive"
              @blur="cancelParentActive"
            />
          </div>
          <div class="form-input-group">
            <label for="code"><i class="iconfont icon-code"></i> </label>
            <input
              type="password"
              id="code"
              @focus="setParentActive"
              @blur="cancelParentActive"
              placeholder="请输入验证码"
            />
            <span>发送验证码</span>
          </div>
        </div>

        <div class="form-agreement">
          <div class="agree">
            <ERabbitCheckBox v-model="isAgree"></ERabbitCheckBox>
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
        </div>
        <ERabbitButton type="primary" class="btn-login"> 登录 </ERabbitButton>
      </form>
    </div>

    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt="QQ登录Logo"
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费登录</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.account-box {
  .toggle {
    padding: 15px 0;
    text-align: right;
    a {
      color: @erColor;
    }
  }
  form {
    .form-input-group {
      height: 2.5rem;
      width: 100%;
      margin-bottom: 28px;
      border: 1px solid #999;
      display: flex;
      align-items: stretch;
      label {
        height: 100%;
        width: calc(2.5rem - 2px);
        background-color: #cfcdcd;
        i {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: calc(2.5rem - 2px);
          text-align: center;
          font-size: 18px;
          background-color: #cfcdcd;
        }
      }
      input {
        flex: 1;
        padding-left: 10px;
      }
      span {
        line-height: calc(2.5rem - 2px);
        padding: 0 10px;
        background-color: #f5f5f5;
        color: #666;
        cursor: pointer;
      }
      &.active {
        border-color: @erColor;
      }
    }
    .form-agreement {
      margin-bottom: 28px;
      a {
        color: #069;
      }
    }
    .btn-login {
      height: 40px;
      width: 100%;
      border-radius: 0;
      margin-bottom: 20px;
    }
  }
  .action {
    display: flex;
    justify-content: space-between;
    a {
      color: #999;
      ~ a {
        margin-left: 10px;
      }
    }
  }
}
</style>
