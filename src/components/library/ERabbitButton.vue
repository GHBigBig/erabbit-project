<script>
export default {
  name: 'ERabbitButton',
};
</script>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'middle',
  },
  type: {
    type: String,
    default: 'default',
  },
});
</script>

<template>
  <button class="er-button ellipsis" :class="[props.size, props.type]">
    <slot />
  </button>
</template>

<style scoped lang="less">
.er-button {
  appearance: none;
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  background: #fff;
}

.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}

.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}

.small {
  width: 100px;
  height: 32px;
  font-size: 14px;
}

.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;
}

.default {
  border-color: #e4e4e4;
  color: #666;
}

.primary {
  border-color: @erColor;
  background-color: @erColor;
  color: #fff;
}

.plain {
  border-color: @erColor;
  color: @erColor;
  background-color: lighten(@erColor, 50%);
}

.gray {
  border-color: #ccc;
  background-color: #ccc;
  color: #fff;
}
</style>
