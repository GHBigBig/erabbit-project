<script setup>
import ERabbitHomePanel from './ERabbitHomePanel.vue';
import ERabbitHomeSkeleton from './ERabbitHomeSkeleton.vue';
import { findHot } from '@/api/home';
import { useLazyData } from '@/hooks';

const { target, result: goods } = useLazyData(findHot);
</script>
<template>
  <ERabbitHomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative; height: 426px">
      <Transition name="fade">
        <ul v-if="goods?.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="人气推荐图片" />
              <p class="title">{{ item.title }}</p>
              <p class="alt">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <ERabbitHomeSkeleton v-else></ERabbitHomeSkeleton>
      </Transition>
    </div>
  </ERabbitHomePanel>
</template>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .alt {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
