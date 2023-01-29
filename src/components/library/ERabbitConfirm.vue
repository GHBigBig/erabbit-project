<script>
export default {
  name: 'ERabbitConfirm',
};
</script>
<script setup>
import { onMounted, ref } from 'vue';
import ERabbitButton from './ERabbitButton.vue';

const props = defineProps({
  title: {
    type: String,
    default: '温馨提示',
  },
  text: {
    type: String,
    default: '',
  },
  submitCallback: {
    type: Function,
  },
  cancelCallback: {
    type: Function,
  },
});

const fade = ref(false);
onMounted(() =>
  //当元素渲染完毕立即过渡的动画不会触发
  setTimeout(() => {
    setTimeout(() => (fade.value = true));
  }, 0)
);
</script>
<template>
  <div class="er-confirm" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ props.title }}</h3>
        <i class="iconfont icon-close-new" @click="props.cancelCallback"></i>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        {{ props.text }}
      </div>
      <div class="footer">
        <ERabbitButton
          size="mini"
          type="gray"
          style="margin-right: 5px"
          @click="props.cancelCallback"
        >
          取消
        </ERabbitButton>
        <ERabbitButton size="mini" type="primary" @click="props.submitCallback">
          确认
        </ERabbitButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.er-confirm {
  background: rgba(0, 0, 0, 0);

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  &.fade {
    transition: all 0.8s;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 5px;
    background: #fff;
    width: 24rem;
    // height: 5rem;

    position: fixed;
    top: 40%;
    left: calc(50% - 12rem);
    opacity: 0;
    &.fade {
      opacity: 1;
      transform: all 0.8s;
    }
    .header {
      display: flex;
      justify-content: space-between;
      h3 {
        font-weight: normal;
      }
      i {
        cursor: pointer;
      }
    }
    .body {
      padding: 10px 0;
      font-size: 16px;
      i {
        margin-right: 5px;
        color: red;
      }
    }
    .footer {
      text-align: right;
    }
  }
}
</style>
