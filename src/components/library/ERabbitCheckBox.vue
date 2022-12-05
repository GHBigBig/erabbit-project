<script>
export default {
  name: 'ERabbitCheckBox',
};
</script>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(['update:modelValue']);
</script>
<template>
  <div
    class="er-checkbox"
    @click="emits('update:modelValue', !props.modelValue)"
  >
    <i v-if="props.modelValue" class="iconfont icon-checked"></i>
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
