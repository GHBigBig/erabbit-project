<script>
export default {
  name: 'ERabbitDialog',
};
</script>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '对话框',
  },
  list: {
    type: Array,
    default: () => [],
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:visible']);

//结构和样式同时加上无过度效果，需要延时
const fade = ref(true);
watch(
  () => props.visible,
  () => {
    setTimeout(() => {
      fade.value = props.visible;
    });
  },
  { immediate: true }
);

const close = () => {
  emits('update:visible', false);
};
</script>

<template>
  <div class="er-dialog" :class="{ fade }" v-if="visible">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ props.title }}</h3>
        <a
          href="javascript:;"
          class="iconfont icon-close-new"
          @click="close"
        ></a>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.er-dialog {
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  &.fade {
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
  }
  .wrapper {
    width: 600px;
    border-radius: 4px;
    background-color: #fff;
    position: absolute;
    left: calc(50% - 300px);
    top: 10%;
    &.fade {
      transition: all 0.4s;
      top: 20%;
    }

    .header {
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      font-size: 18px;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        font-size: 22px;
        position: absolute;
        top: 0;
        right: 1rem;
      }
    }

    .body {
      padding: 20px 40px;
      max-height: 400px;
      overflow-y: scroll;
      ul {
        padding: 10px;
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        li {
          height: 30px;
          line-height: 30px;
        }
      }
    }

    .footer {
      padding: 10px 0 30px;
      text-align: center;
    }
  }
}
</style>
