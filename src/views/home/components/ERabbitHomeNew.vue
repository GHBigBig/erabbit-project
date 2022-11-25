<script setup>
import { findNew } from '@/api/home';
import ERabbitHomePanel from './ERabbitHomePanel.vue';
import ERabbitHomeSkeleton from './ERabbitHomeSkeleton.vue';
import { useLazyData } from '@/hooks';

const { target, result: goods } = useLazyData(findNew);
</script>
<template>
  <div class="home-new">
    <ERabbitHomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><ERabbitMore path="/"></ERabbitMore></template>
      <div ref="target" style="position: relative; height: 406px">
        <Transition name="fade">
          <ul class="goods-list" v-if="goods?.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="新鲜好物图片" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <ERabbitHomeSkeleton bg="#f0f9f4" v-else></ERabbitHomeSkeleton>
        </Transition>
      </div>
    </ERabbitHomePanel>
  </div>
</template>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
