<script>
export default {
  name: 'ERabbitCheckBox',
};
</script>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue']);

const checked = ref(false);
watch(
  () => props.modelValue,
  () => {
    checked.value = props.modelValue;
  },
  { immediate: true }
);
const changeChecked = () => {
  checked.value = !checked.value;
  // 使用emit通知父组件数据的改变
  emits('update:modelValue', checked.value);
};
</script>
<template>
  <div class="er-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>
<style scoped lang="less">
.er-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @erColor;
    ~ span {
      color: @erColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
