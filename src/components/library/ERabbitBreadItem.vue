<script>
export default {
  name: 'ERabbitBreadItem',
};
</script>

<script setup>
const props = defineProps({
  to: {
    type: [String, Object],
  },
});
</script>
<template>
  <div class="er-bread-item">
    <RouterLink v-if="props.to" :to="to"><slot></slot></RouterLink>
    <span v-else><slot></slot></span>
    <!-- <i class="iconfont icon-angle-right"></i> -->
  </div>
</template>
<style scoped lang="less"></style>
