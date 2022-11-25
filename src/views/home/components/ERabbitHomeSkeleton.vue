<script setup>
const props = defineProps({
  bg: {
    type: String,
    default: '#fff',
  },
});
</script>
<template>
  <div class="home-skeleton">
    <div
      class="item"
      v-for="i in 4"
      :key="i"
      :style="{ backgroundColor: props.bg }"
    >
      <ERabbitSkeleton
        bg="#e4e4e4"
        width="306px"
        height="306px"
        animated
      ></ERabbitSkeleton>
      <ERabbitSkeleton
        bg="#e4e4e4"
        width="160px"
        height="24px"
        animated
      ></ERabbitSkeleton>
      <ERabbitSkeleton
        bg="#e4e4e4"
        width="120px"
        height="24px"
        animated
      ></ERabbitSkeleton>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .er-skeleton ~ .er-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
