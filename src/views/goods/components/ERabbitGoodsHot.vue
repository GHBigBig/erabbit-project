<script>
export default {
  name: 'ERabbitGoodsHot',
};
</script>
<script setup>
import { computed, ref } from 'vue';
import ERabbitCategoryGoodsItem from '@/views/category/components/ERabbitCategoryGoodsItem.vue';
import { findHotGoods } from '@/api/goods';

const props = defineProps({
  type: {
    type: Number,
    default: 1,
  },
  goodsId: {
    type: Number,
  },
});

const titleOption = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' };
const title = computed(() => {
  return titleOption[props.type];
});

const goodsList = ref([]);
findHotGoods({ id: props.goodsId, type: props.type }).then((data) => {
  goodsList.value = data.result.map((item) => {
    item.tag = item.desc;
    return item;
  });
});
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList?.length">
      <ERabbitCategoryGoodsItem
        v-for="goods in goodsList"
        :key="goods.id"
        :goods="goods"
      ></ERabbitCategoryGoodsItem>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: normal;
    background-color: @helpColor;
    color: #fff;
  }

  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
