<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();

const category = computed(() => {
  const obj = {};
  store.state.category.list.find((item) => {
    if (
      item?.children?.find((child) => {
        if (child.id === route.params.id) {
          obj.sub = child;
          return true;
        }
      })
    ) {
      obj.top = item;
      return true;
    }
  });

  return obj;
});
</script>
<template>
  <ERabbitBread>
    <ERabbitBreadItem to="/">首页</ERabbitBreadItem>
    <Transition name="fade-top" mode="out-in">
      <ERabbitBreadItem
        :key="category?.top?.id"
        :to="`/category/${category?.top?.id}`"
      >
        {{ category?.top?.name }}
      </ERabbitBreadItem>
    </Transition>

    <Transition name="fade-right" mode="out-in">
      <ERabbitBreadItem :key="category?.sub?.id">
        {{ category?.sub?.name }}
      </ERabbitBreadItem>
    </Transition>
  </ERabbitBread>
</template>
