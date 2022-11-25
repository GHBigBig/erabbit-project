<script setup>
import { findBrand } from '@/api/home';
import { ref } from 'vue';
import ERabbitHomePanel from './ERabbitHomePanel.vue';
import { useLazyData } from '@/hooks';

const { target, result: brands } = useLazyData(() => findBrand(10));

const index = ref(0);
const toggle = (step) => {
  const tmp = index.value + step;
  if (tmp < 0 || tmp > 1) {
    return;
  }
  index.value = tmp;
};
</script>
<template>
  <ERabbitHomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a
        href="javascript:;"
        :class="{ disabled: index === 0 }"
        class="iconfont icon-angle-left prev"
        @click="toggle(-1)"
      ></a>
      <a
        href="javascript:;"
        :class="{ disabled: index === 1 }"
        class="iconfont icon-angle-right next"
        @click="toggle(1)"
      ></a>
    </template>
    <div ref="target" class="box" style="position: relative; height: 426px">
      <Transition name="fade">
        <ul
          v-if="brands?.length"
          class="list"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="热门品牌图片" />
            </RouterLink>
          </li>
        </ul>
        <div class="skeleton" v-else>
          <ERabbitSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          ></ERabbitSkeleton>
        </div>
      </Transition>
    </div>
  </ERabbitHomePanel>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  height: 20px;
  width: 20px;
  margin-left: 5px;
  background: @erColor;
  color: #fff;
  text-align: center;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  height: 345px;
  width: 100%;
  padding-bottom: 40px;
  overflow: hidden;
  .list {
    display: flex;
    width: 200%;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-of-type(5) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-of-type(5) {
      margin-right: 0;
    }
  }
}
</style>
