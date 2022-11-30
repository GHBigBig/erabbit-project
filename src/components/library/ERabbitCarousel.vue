<script>
export default {
  name: 'ERabbitCarousel',
};
</script>
<script setup>
import { onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  sliders: {
    type: Array,
    default: () => [],
  },
  duration: {
    type: Number,
    default: 3000,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
});

const index = ref(0);

let timer = null;
const autoPlayFn = () => {
  clearInterval(timer);

  //“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。
  timer = setInterval(() => {
    index.value = (index.value + 1) % props.sliders.length;
  }, props.duration);
};
watch(
  () => props.sliders,
  (newVal) => {
    if (newVal.length && props.autoPlay) {
      autoPlayFn();
    }
  },
  { immediate: true } //在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
);
const stop = () => {
  if (timer) {
    clearInterval(timer);
  }
};
const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlayFn();
  }
};
const toggle = (step) => {
  if (index.value + step < 0) {
    index.value = index.value + props.sliders.length;
  }
  index.value = (index.value + step) % props.sliders.length;
};

//组件销毁，清理定时器
onUnmounted(() => clearInterval(timer));
</script>
<template>
  <div class="er-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in props.sliders"
        :key="item.id"
        :class="{ fade: index === i }"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="商品图片" />
        </RouterLink>
      </li>
      <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"
        ><i class="iconfont icon-angle-left"></i
      ></a>
      <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"
        ><i class="iconfont icon-angle-right"></i
      ></a>
      <div class="carousel-indicator">
        <span
          v-for="(item, i) in props.sliders"
          :key="item.id"
          :class="{ active: index === i }"
        ></span>
      </div>
    </ul>
  </div>
</template>

<style scoped lang="less">
.er-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.8s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      line-height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      z-index: 2;
      text-align: center;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }

  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(.carousel-btn.indicator) {
    padding-left: 250px;
  }
}
</style>
