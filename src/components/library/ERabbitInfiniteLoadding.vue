<script>
export default {
  name: 'ERabbitInfiniteLoadding',
};
</script>
<script setup>
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
  loadding: {
    type: Boolean,
    default: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['infinite']);

const container = ref(null);

useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (props.loadding === false && props.finished === false) {
        emits('infinite');
      }
    }
  },
  {
    threshold: 0,
  }
);
</script>
<template>
  <div class="er-infinite-loadding" ref="container">
    <div class="loadding load" v-if="props.loadding">
      <span class="img"></span>
      <span class="text">正在加载……</span>
    </div>
    <div class="loadding none" v-if="props.finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<style scoped lang="less">
.er-infinite-loadding {
  .loadding {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      color: #999;
      font-size: 16px;
    }
    &.load {
      .img {
        width: 50px;
        height: 50px;
        background: url(../../assets/images/loadding.gif) no-repeat center /
          contain;
      }
    }
    &.none {
      .img {
        width: 200px;
        height: 134px;
        background: url(../../assets/images/none.png) no-repeat center / contain;
      }
    }
  }
}
</style>
