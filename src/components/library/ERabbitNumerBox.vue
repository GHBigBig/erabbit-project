<script>
export default {
  name: 'ERabbitNumerBox',
};
</script>
<script setup>
const props = defineProps({
  lable: {
    type: String,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: Number,
    default: 1,
  },
});
const emits = defineEmits(['update:modelValue']);

const changeNum = (step) => {
  const tmp = props.modelValue + step;
  if (tmp < props.min || tmp > props.max) {
    return;
  }
  emits('update:modelValue', tmp);
};
</script>

<template>
  <div class="er-numberbox">
    <div class="label"><slot></slot></div>
    <div class="numberbox">
      <a
        href="javascript:"
        @click="changeNum(-1)"
        :class="{ disabled: props.modelValue === props.min }"
      >
        -
      </a>
      <input type="number" step="1" :value="props.modelValue" readonly />
      <a
        href="javascript:"
        @click="changeNum(1)"
        :class="{ disabled: props.modelValue === props.max }"
      >
        +
      </a>
    </div>
  </div>
</template>

<style scoped lang="less">
.er-numberbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    padding-left: 10px;
    color: #999;
  }

  .numberbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      font-size: 16px;
      text-align: center;
      color: #666;
      background: #f8f8f8;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }

      &.disabled {
        cursor: not-allowed;
        color: #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
