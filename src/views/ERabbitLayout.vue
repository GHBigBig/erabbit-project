<script setup>
import ERabbitAppTopnav from '@/components/ERabbitAppTopnav.vue';
import ERabbitAppHearder from '@/components/ERabbitAppHearder.vue';
import ERabbitAppFooter from '@/components/ERabbitAppFooter.vue';
</script>
<template>
  <ERabbitAppTopnav></ERabbitAppTopnav>
  <ERabbitAppHearder></ERabbitAppHearder>
  <main>
    <!-- 二级路由 -->
    <RouterView></RouterView>
  </main>
  <ERabbitAppFooter></ERabbitAppFooter>
</template>
