<script>
export default {
  name: 'ERabbitSkeleton',
};
</script>
<script setup>
defineProps({
  bg: {
    type: String,
    default: '#efefef',
  },
  width: {
    type: String,
    default: '100px',
  },
  height: {
    type: String,
    default: '100px',
  },
  animated: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div
    class="er-skeleton"
    :style="{ width, height }"
    :class="{ shan: animated }"
  >
    <div class="block" :style="{ backgroundColor: bg }"></div>
  </div>
</template>

<style lang="less" scoped>
.er-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  animation: fade 1s linear infinite alternate;
}

@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
.shan {
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    animation: shan 1.5s ease 0s infinite;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
