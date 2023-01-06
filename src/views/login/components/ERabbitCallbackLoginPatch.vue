<script>
export default {
  name: 'ERabbitCallbackLoginPatch',
};
</script>
<script setup>
import schema from '@/utils/vee-validate-schema';
import { useIntervalFn } from '@vueuse/core';
import { Form, Field } from 'vee-validate';
import { onUnmounted, reactive, ref } from 'vue';
import { userQQPatchCode, userQQPatchLogin } from '@/api/user';
import Message from '@/components/library/Message';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  unionId: {
    type: String,
    default: '',
  },
});

//表单校验规则
const mySchema = {
  account: schema.accountApi,
  mobile: schema.mobile,
  code: schema.code,
  password: schema.password,
  rePassword: schema.rePassword,
};

//表单信息
const router = useRouter();
const store = useStore();
const form = reactive({
  mobile: '',
  account: '',
  code: '',
  password: '',
});
const submit = async () => {
  const { valid } = await formCom.value.validate();
  console.log(valid);
  if (valid) {
    userQQPatchLogin({
      unionId: props.unionId,
      ...form,
    })
      .then((data) => {
        // 实现和之前登录一样的逻辑
        // 1. 存储用户信息
        const { id, account, avatar, mobile, nickname, token } = data.result;
        store.commit('user/setUser', {
          id,
          account,
          avatar,
          mobile,
          nickname,
          token,
        });
        // 3. 成功提示
        Message({ type: 'success', text: 'QQ完善信息成功' });
        // 2. 跳转到来源页或者首页
        router.push(store.state.user.redirectUrl);
      })
      .catch(() => {
        Message({ type: 'error', text: '完善信息失败' });
      });
  }
};

//验证码发送
const time = ref(0);
const formCom = ref(null); //Form 组件的引用
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (0 === time.value) pause;
  },
  1000,
  { immediate: false }
);
onUnmounted(() => pause());
const send = async () => {
  const vaild = mySchema.mobile(form.mobile);
  if (true === vaild) {
    if (0 === time.value) {
      time.value = 60;
      await userQQPatchCode(form.mobile);
      Message({ type: 'success', text: '发送成功' });
      resume();
    }
  } else {
    formCom.value.setFieldError('mobile', vaild);
  }
};
</script>
<template>
  <Form
    :validation-schema="mySchema"
    autocomplete="off"
    #="{ errors }"
    class="er-form"
    ref="formCom"
  >
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          name="account"
          type="text"
          class="input"
          :class="{ err: errors.account }"
          v-model="form.account"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error">{{ errors.account }}</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          name="mobile"
          type="text"
          class="input"
          :class="{ err: errors.mobile }"
          v-model="form.mobile"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error">{{ errors.mobile }}</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          name="code"
          type="text"
          class="input"
          :class="{ err: errors.code }"
          v-model="form.code"
          placeholder="请输入短信验证码"
        />
        <span class="code" @click="send">
          {{ 0 === time ? '发送验证码' : `${time}秒后发送验证码` }}
        </span>
      </div>
      <div class="error">{{ errors.code }}</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          name="password"
          type="password"
          class="input"
          :class="{ err: errors.password }"
          autocomplete="off"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error">{{ errors.password }}</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          name="rePassword"
          type="password"
          class="input"
          :class="{ err: errors.rePassword }"
          autocapitalize="off"
          placeholder="请再次输入密码"
        />
      </div>
      <div class="error">{{ errors.rePassword }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </Form>
</template>
<style></style>
