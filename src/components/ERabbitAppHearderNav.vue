<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const list = computed(() => store.state.category.list);
const show = (item) => store.commit('category/show', item);
const hide = (item) => store.commit('category/hide', item);
</script>

<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>

    <li
      v-for="item of list"
      :key="item.id"
      @mouseenter="show(item)"
      @mouseleave="hide(item)"
    >
      <RouterLink :to="`/category/${item.id}`" @click="hide(item)">
        {{ item.name }}
      </RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub of item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="商品图片" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
.app-header-nav {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  > li {
    > a {
      display: inline-block;
      font-size: 16px;
      height: 32px;
      line-height: 32px;
    }

    &:hover > a {
      color: @erColor;
      border-bottom: 1px solid @erColor;
    }
  }
}

.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  opacity: 0;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  z-index: 999;

  &.open {
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
      }

      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @erColor;
        }
      }
    }
  }
}
</style>
