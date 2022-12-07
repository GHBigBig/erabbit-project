<script>
export default {
  name: 'ERabbitCity',
};
</script>
<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const openState = ref(false);
const optionDiv = ref(null);

function toggleState() {
  openState.value = !openState.value;
}

onClickOutside(optionDiv, () => {
  openState.value = false;
});
</script>
<template>
  <div class="er-city" ref="optionDiv">
    <div class="select" @click="toggleState()">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-if="openState" class="option">
      <span v-for="i in 24" :key="i">北京</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.er-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    height: 30px;
    line-height: 28px;
    padding: 0 5px;
    border: 1px solid #e4e4e4;
    margin-left: 10px;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 15px;
    }
  }
  .option {
    width: 542px;
    min-height: 30px;
    line-height: 30px;
    padding: 10px;
    border: 1px solid #e4e4e4;
    margin-left: 10px;
    position: absolute;
    left: 0;
    top: 29px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    > span {
      width: 130px;
      padding: 0 3px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
