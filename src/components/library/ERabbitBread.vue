<script>
export default {
  name: 'ERabbitBread',
};
</script>

<script setup>
import { h, useSlots } from 'vue';

const slots = useSlots();

const items = slots.default();
const generateItems = [];

items.forEach((item, i) => {
  generateItems.push(item);
  if (i < items.length - 1) {
    generateItems.push(h('i', { class: 'iconfont icon-angle-right' }));
  }
});

const ERBread = () => h('div', { class: 'er-bread' }, generateItems);
</script>
<template>
  <ERBread></ERBread>
</template>

<style lang="less">
.er-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @erColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin: auto 5px;
    line-height: 22px;
  }
}
</style>
