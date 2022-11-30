<script setup>
import { findBanner } from '@/api/home';
import { findTopCategory } from '@/api/category';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ERabbitCategoryGoodsItem from './components/ERabbitCategoryGoodsItem.vue';

const sliders = ref([]);
findBanner().then((data) => {
  sliders.value = data.result;
});

const store = useStore();
const route = useRoute();

const topCategory = computed(() => {
  const cate = store.state.category.list.find(
    (item) => route.params.id === item.id
  );
  return cate ?? {};
});

const subList = ref([]);
const getSubList = () => {
  findTopCategory(route.params.id).then((data) => {
    subList.value = data.result.children;
  });
};
watch(
  () => route.params.id,
  () => getSubList(),
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <ERabbitBread>
        <ERabbitBreadItem to="/">首页</ERabbitBreadItem>
        <Transition name="fade-right" mode="out-in">
          <ERabbitBreadItem>{{ topCategory.name }}</ERabbitBreadItem>
        </Transition>
      </ERabbitBread>
      <!-- 轮播图 -->
      <ERabbitCarousel
        :sliders="sliders"
        style="height: 500px"
      ></ERabbitCarousel>
      <!-- 二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:">
              <img :src="item.picture" alt="二级分类照片" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>-{{ item.name }}-</h3>
          <p class="tag">{{ item.desc }}</p>
          <ERabbitMore></ERabbitMore>
        </div>
        <div class="body">
          <ERabbitCategoryGoodsItem
            v-for="g in item.goods"
            :key="g.id"
            :goods="g"
          ></ERabbitCategoryGoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.top-category {
  .sub-list {
    background-color: #fff;
    margin-top: 20px;
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        height: 160px;
        width: 160px;
        a {
          display: block;
          text-align: center;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @erColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .er-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      h3 {
        line-height: 100px;
        text-align: center;
        font-size: 28px;
        font-weight: 400;
        color: #666;
      }
      .tag {
        position: relative;
        top: -20px;
        text-align: center;
        font-size: 20px;
        color: #999;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
