<script>
export default {
  name: 'ERabbitLoginForm',
};
</script>
<script setup>
import { onUnmounted, ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useIntervalFn } from '@vueuse/core';
import { userMobileLoginMsg } from '@/api/user';
import Message from '@/components/library/Message';

const emits = defineEmits(['userLogin', 'telLogin']);

const isMsgLogin = ref(false);
const isAgree = ref(false);
const time = ref(0);
const myForm = ref(null);

const setParentActive = (e) => {
  e.target.parentNode.classList.add('active');
};
const cancelParentActive = (e) => {
  e.target.parentNode.classList.remove('active');
};

//短信计时
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) {
      pause();
    }
  },
  1000,
  { immediate: false }
);
onUnmounted(() => {
  pause();
});
//卸载停止计时
onUnmounted(() => pause());

//发送短信
const send = async () => {
  const value = document.querySelector('#tel').value;
  const valid = validateMobile(value);
  if (true === valid) {
    //发送成功
    await userMobileLoginMsg(value);
    Message({ type: 'success', text: '发送成功' });
    time.value = 60;
    resume();
  } else {
    //发送失败
    myForm.value.setFieldError('mobile', valid);
  }
};

// 停止挂载的时候
onUnmounted(() => {
  pause();
});

//用户名验证规则
function validateAccount(value) {
  if (!value) {
    return '请输入用户名';
  }
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
    return '字母开头且6-20个字符';
  }
  return true;
}
//密码验证规则
function validatePassword(value) {
  if (!value) {
    return '请输入密码';
  }
  if (!/^\w{6,24}$/.test(value)) {
    return '密码6~24个字符';
  }
  return true;
}
//手机号验证规则
function validateMobile(value) {
  if (!value) {
    return '请输入手机号';
  }
  if (!/^1[3-9]\d{9}$/.test(value)) {
    return '手机号格式错误';
  }
  return true;
}
//手机验证码验证规则
function validateCode(value) {
  if (!value) {
    return '请输入验证码';
  }
  if (!/^\d{6}$/.test(value)) {
    return '验证码为6位';
  }
  return true;
}

function validateIsAgree(value) {
  if (!value) {
    return '请勾选协议';
  }
  return true;
}

function onSubmit(values) {
  if (isMsgLogin.value) {
    //手机号登录
    emits('telLogin', values);
  } else {
    //账户密码登录
    emits('userLogin', values);
  }
}
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
      <Form novalidate autocomplete="off" @submit="onSubmit" ref="myForm">
        <div v-if="!isMsgLogin">
          <div class="form-input-group">
            <label for="username"><i class="iconfont icon-user"></i></label>
            <Field
              name="account"
              type="text"
              id="username"
              placeholder="请输入用户名"
              :rules="validateAccount"
              @focus="setParentActive"
              @blur="cancelParentActive"
            />
            <ErrorMessage name="account" class="invalid"></ErrorMessage>
          </div>

          <div class="form-input-group">
            <label for="password"><i class="iconfont icon-msg"></i></label>
            <Field
              name="password"
              type="password"
              id="password"
              autocomplete="off"
              :rules="validatePassword"
              @focus="setParentActive"
              @blur="cancelParentActive"
              placeholder="请输入密码"
            />
            <ErrorMessage name="password" class="invalid"></ErrorMessage>
          </div>
        </div>
        <div v-else>
          <div class="form-input-group">
            <label for="tel"><i class="iconfont icon-user"></i></label>
            <Field
              name="mobile"
              type="text"
              id="tel"
              placeholder="请输入手机号"
              :rules="validateMobile"
              @focus="setParentActive"
              @blur="cancelParentActive"
            />
            <ErrorMessage name="mobile" class="invalid"></ErrorMessage>
          </div>
          <div class="form-input-group">
            <label for="code"><i class="iconfont icon-code"></i> </label>
            <Field
              name="code"
              type="text"
              id="code"
              :rules="validateCode"
              @focus="setParentActive"
              @blur="cancelParentActive"
              placeholder="请输入验证码"
            />
            <span class="group" @click="send">
              {{ time === 0 ? '发送验证码' : `${time}秒后发送` }}
            </span>
            <ErrorMessage name="code" class="invalid"></ErrorMessage>
          </div>
        </div>

        <div class="form-agreement">
          <div class="agree">
            <!-- <ERabbitCheckBox v-model="isAgree"></ERabbitCheckBox> -->
            <Field
              as="ERabbitCheckBox"
              name="isAgree"
              v-model="isAgree"
              :rules="validateIsAgree"
            ></Field>
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </div>
          <ErrorMessage name="isAgree" class="error"></ErrorMessage>
        </div>
        <ERabbitButton type="primary" class="btn-login"> 登录 </ERabbitButton>
      </Form>
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
      position: relative;
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
      span.group {
        line-height: calc(2.5rem - 2px);
        padding: 0 10px;
        background-color: #f5f5f5;
        color: #666;
        cursor: pointer;
      }
      .invalid {
        position: absolute;
        top: 2.5rem;
        font-size: 14px;
        color: red;
      }

      &.active {
        border-color: @erColor;
        border-width: 2px;
      }
      &.error {
        border-color: @warnColor;
        border-width: 2px;
      }
    }
    .form-agreement {
      position: relative;
      .agree {
        margin-bottom: 28px;
      }
      a {
        color: #069;
      }
      .error {
        position: absolute;
        top: 1.4rem;
        font-size: 14px;
        color: red;
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
