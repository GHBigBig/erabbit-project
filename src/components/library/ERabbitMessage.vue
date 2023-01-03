<script>
export default {
  name: 'ERabbitMessage',
};
</script>
<script setup>
import { onMounted, ref } from 'vue';
import Message from '@/components/library/Message';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'warn',
  },
});

const styleOptions = {
  warn: {
    icon: 'icon-warning',
    color: '#E6A23C',
    backgroundColor: 'rgb(253, 246, 236)',
    borderColor: 'rgb(250, 236, 216)',
  },
  error: {
    icon: 'icon-shanchu',
    color: '#F56C6C',
    backgroundColor: 'rgb(254, 240, 240)',
    borderColor: 'rgb(253, 226, 226)',
  },
  success: {
    icon: 'icon-queren2',
    color: '#67C23A',
    backgroundColor: 'rgb(240, 249, 235)',
    borderColor: 'rgb(225, 243, 216)',
  },
};
const visible = ref(false);

onMounted(() => {
  visible.value = true;
});

setInterval(Message, 6000);
</script>
<template>
  <Transition name="down">
    <div class="er-message" :style="styleOptions[type]">
      <i class="iconfont" :class="[styleOptions[type].icon]"></i>
      <span class="text">{{ props.text }}</span>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.er-message {
  width: 300px;
  height: 50px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #999;
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  text-align: center;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
