<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { findSubCategoryFilter } from '@/api/category';

const emits = defineEmits(['filter-change']);

const route = useRoute();
const filterData = ref(null);
const filterLoading = ref(false);

//实测，切换到一级界面时，此 watch 也会被触发
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/sub/${newVal}` === route.path) {
      filterLoading.value = true;
      findSubCategoryFilter(route.params.id).then(({ result }) => {
        result.selectBrand = null;
        result.brands.unshift({ id: null, name: '全部' });
        result.saleProperties.forEach((p) => {
          p.selectProp = null;
          p.properties.unshift({ id: null, name: '全部' });
        });
        filterData.value = result;
        filterLoading.value = false;
      });
    }
  },
  { immediate: true }
);

const getFilterParams = () => {
  //获取筛选参数
  const filterParams = {};
  const attrs = [];
  filterData.value.saleProperties.forEach((p) => {
    if (p.selectProp) {
      const attr = p.properties.find((pp) => pp.id === p.selectProp);
      if (attr?.id) {
        attrs.push({ groupName: p.name, propertyName: attr.name });
      }
    }
  });

  if (filterData.value.selectBrand) {
    filterParams.brandId = filterData.value.selectBrand;
  }
  if (attrs.length) {
    filterParams.attrs = attrs;
  }
  return filterParams;
};

const changeBrand = (brandId) => {
  //选择品牌
  if (filterData.value.selectBrand === brandId) {
    return;
  }
  filterData.value.selectBrand = brandId;
  const filterParam = getFilterParams();
  emits('filter-change', filterParam);
};

const changeAttr = (p, attrId) => {
  if (p.selectProp === attrId) {
    return;
  }
  p.selectProp = attrId;
  const filterParam = getFilterParams();
  emits('filter-change', filterParam);
};
</script>
<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="title">品牌：</div>
      <div class="content">
        <a
          href="javascript:;"
          v-for="b in filterData.brands"
          :class="{ active: filterData.selectBrand === b.id }"
          :key="b.id"
          @click="changeBrand(b.id)"
        >
          {{ b.name }}
        </a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="title">{{ p.name }}：</div>
      <div class="content">
        <a
          href="javascript:;"
          v-for="prop in p.properties"
          :class="{ active: p.selectProp === prop.id }"
          :key="prop.id"
          @click="changeAttr(p, prop.id)"
        >
          {{ prop.name }}
        </a>
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <ERabbitSkeleton class="item" width="800px" height="40px"></ERabbitSkeleton>
    <ERabbitSkeleton class="item" width="800px" height="40px"></ERabbitSkeleton>
    <ERabbitSkeleton class="item" width="600px" height="40px"></ERabbitSkeleton>
    <ERabbitSkeleton class="item" width="600px" height="40px"></ERabbitSkeleton>
    <ERabbitSkeleton class="item" width="600px" height="40px"></ERabbitSkeleton>
  </div>
</template>
<style scoped lang="less">
.sub-filter {
  background-color: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .title {
      width: 80px;
      color: #999;
    }
    .content {
      flex: 1;
      a {
        display: inline-block;
        margin-right: 36px;
        transform: all 0.3s;
        &:hover,
        &.active {
          color: @erColor;
        }
      }
    }
  }
}

.er-skeleton {
  padding: 10px 0;
}
</style>
