<script>
export default {
  name: 'ERabbitLoginCallbackBind',
};
</script>
<script setup>
import QC from 'qc';
import { ref, reactive, onUnmounted } from 'vue';
import { Form, Field } from 'vee-validate';
import schema from '@/utils/vee-validate-schema';
import Message from '@/components/library/Message';
import { useIntervalFn } from '@vueuse/core';
import { userQQBindCode, userQQBindLogin } from '@/api/user';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  unionId: {
    type: String,
    default: '',
  },
});

const nickname = ref(null);
const avater = ref(null);

if (QC.Login.check()) {
  QC.api('get_user_info').success((res) => {
    avater.value = res.data.figureurl_1;
    nickname.value = res.data.nickname;
  });
}

//校验规则对象
const mySchema = {
  mobile: schema.mobile,
  code: schema.code,
};
//Form 组件的引用
const formCom = ref(null);
//表单数据对象
const form = reactive({
  mobile: null,
  code: null,
});

//表单可发送倒计时
const time = ref(0);
const send = async () => {
  const valid = mySchema.mobile(form.mobile);

  if (true === valid) {
    if (0 === time.value) {
      //计时结束才可以发送验证码
      await userQQBindCode(form.mobile);
      Message({ type: 'success', text: '发送成功' });
      time.value = 60;
      resume();
    }
  } else {
    // 手机号校验失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
    formCom.value.setFieldError('mobile', valid);
  }
};

//发送验证码计时
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value === 0) {
      pause();
    }
  },
  1000,
  { immediate: false }
);
//卸载组件暂停验证码计时
onUnmounted(() => void pause());

const store = useStore();
const router = useRouter();
const submit = async () => {
  const valid = formCom.value.validate();
  if (valid) {
    userQQBindLogin({ unionId: props.unionId, ...form }).then((data) => {
      //QQ绑定成功，完成用户登录
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
      //合并购物车操作
      store.dispatch('cart/mergeLocalCart').then(() => {
        // 2. 成功提示
        Message({ type: 'success', text: 'QQ绑定成功' });
        // 3. 跳转到来源页或者首页
        router.push(store.state.user.redirectUrl);
      });
    });
  }
};
</script>
<template>
  <Form
    ref="formCom"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    autocomplete="off"
    class="er-form"
  >
    <div class="user-info">
      <img :src="avater" alt="用户头像" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          type="text"
          class="input"
          :class="{ err: errors.mobile }"
          v-model="form.mobile"
          name="mobile"
          placeholder="请输入要绑定的手机号"
        />
      </div>
      <div class="error">{{ errors.mobile }}</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          type="text"
          class="input"
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
          placeholder="请输入短信验证码"
        />
        <span class="code" @click="send">
          {{ 0 === time ? '发送验证码' : `${time}秒后发送` }}
        </span>
      </div>
      <div class="error">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit()">立即绑定</a>
  </Form>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  padding: 0 10px;
  margin: 0 auto;
  margin-bottom: 25px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    background-color: #f2f2f2;
  }
  p {
    padding-left: 10px;
  }
}
</style>
