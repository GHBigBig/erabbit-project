<script setup>
import ERabbitSubCategoryBread from './components/ERabbitSubCategoryBread.vue';
import ERabbitSubCategoryFilter from './components/ERabbitSubCategoryFilter.vue';
import ERabbitSubCategorySort from './components/ERabbitSubCategorySort.vue';
import ERabbitCategoryGoodsItem from './components/ERabbitCategoryGoodsItem.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { findSubCategoryGoods } from '@/api/category';

const route = useRoute();
const loadding = ref(false);
const finished = ref(false);
const goodsList = ref([]);

let reqParams = {
  page: 1,
  pageSize: 20,
};

const getDate = () => {
  loadding.value = true; //正在加载
  reqParams.categoryId = route.params.id;
  findSubCategoryGoods(reqParams).then(({ result }) => {
    if (result.items.length) {
      goodsList.value.push(...result.items);
      reqParams.page++;
    } else {
      finished.value = true; //数据加载完
    }
    loadding.value = false; //请求结束
  });
};

const initReqParams = () => {
  reqParams.page = 1;
  reqParams.pageSize = 20;
  goodsList.value.length = 0;
  getDate();
};

watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/sub/${route.params.id}` === route.path) {
      initReqParams();
    }
  }
);

//监听筛选区改变
const changeFilter = (filterParams) => {
  console.debug('changeFilter: ', filterParams);
  reqParams = { ...reqParams, ...filterParams };
  console.debug(reqParams);
  initReqParams();
};

//监听排序改变
const changeSort = (sortParams) => {
  reqParams = { ...reqParams, ...sortParams };
  initReqParams();
};
</script>
<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑导航 -->
      <ERabbitSubCategoryBread></ERabbitSubCategoryBread>
      <!-- 条件筛选区 -->
      <ERabbitSubCategoryFilter
        @filter-change="changeFilter"
      ></ERabbitSubCategoryFilter>
      <div class="goods-list">
        <!-- 排序条件 -->
        <ERabbitSubCategorySort
          @sort-change="changeSort"
        ></ERabbitSubCategorySort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <ERabbitCategoryGoodsItem :goods="goods"></ERabbitCategoryGoodsItem>
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <ERabbitInfiniteLoadding
          :loadding="loadding"
          :finished="finished"
          @infinite="getDate"
        ></ERabbitInfiniteLoadding>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.goods-list {
  padding: 0 25px;
  margin-top: 25px;
  background: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-of-type(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
