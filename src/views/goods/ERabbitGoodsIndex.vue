<script setup>
import { findGoods } from '@/api/product';
import { getCurrentInstance, nextTick, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ERabbitGoodsHot from './components/ERabbitGoodsHot.vue';
import ERabbitGoodsImage from './components/ERabbitGoodsImage.vue';
import ERabbitGoodsName from './components/ERabbitGoodsName.vue';
import ERabbitGoodsRecommend from './components/ERabbitGoodsRecommend.vue';
import ERabbitGoodsSales from './components/ERabbitGoodsSales.vue';
import ERabbitGoodsSKU from './components/ERabbitGoodsSKU.vue';
import ERabbitGoodsTabs from './components/ERabbitGoodsTabs.vue';
import ERabbitGoodsWarn from './components/ERabbitGoodsWarn.vue';

const goods = ref(null);
const route = useRoute();

provide('goods', goods);

watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then((data) => {
        goods.value = null; //结合 v-if 使组件可以重新销毁和创建
        nextTick(() => {
          goods.value = data.result;
        });
        goods.value = data;
      });
    }
  },
  { immediate: true }
);

const num = ref(1); //购买数量
const currSku = ref(null);
const store = useStore();
const instance = getCurrentInstance();
//用户选择的规格
const changeSku = (sku) => {
  if (sku.skuId) {
    goods.value.price = sku.price;
    goods.value.oldPrice = sku.oldPrice;
    goods.value.inventory = sku.inventory;
    currSku.value = sku;
  } else {
    currSku.value = null;
  }
};
//添加商品购物车
const insertCart = () => {
  if (!currSku.value) {
    return instance.proxy.$message({ type: 'warn', text: '请选择商品规格' });
  }
  if (num.value > goods.value.inventory) {
    return instance.proxy.$message({ type: 'warn', text: '库存不足' });
  }
  store
    .dispatch('cart/insertCart', {
      id: goods.value.id,
      skuId: currSku.value.skuId,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: currSku.value.price,
      nowPrice: currSku.value.price,
      count: num.value,
      attrsText: currSku.value.specsText,
      selected: true,
      isEffective: true,
      stock: currSku.value.inventory,
    })
    .then(() => {
      instance.proxy.$message({ text: '加入购物车成功', type: 'success' });
    });
};
</script>
<template>
  <div class="er-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <ERabbitBread>
        <ERabbitBreadItem to="/">首页</ERabbitBreadItem>
        <ERabbitBreadItem :to="`/category/${goods.categories[0].id}`">
          {{ goods.categories[0].name }}
        </ERabbitBreadItem>
        <ERabbitBreadItem :to="`/category/sub/${goods.categories[1].id}`">
          {{ goods.categories[1].name }}
        </ERabbitBreadItem>
        <ERabbitBreadItem>{{ goods.name }}</ERabbitBreadItem>
      </ERabbitBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <ERabbitGoodsImage :images="goods.mainPictures"></ERabbitGoodsImage>
          <ERabbitGoodsSales :goods="goods"></ERabbitGoodsSales>
        </div>
        <div class="spec">
          <ERabbitGoodsName :goods="goods"></ERabbitGoodsName>
          <ERabbitGoodsSKU :goods="goods" @change="changeSku"></ERabbitGoodsSKU>
          <ERabbitNumerBox
            v-model="num"
            label="数量"
            :max="goods.inventory"
          ></ERabbitNumerBox>
          <ERabbitButton
            type="primary"
            @click="insertCart"
            style="margin-top: 20px"
          >
            加入购物车
          </ERabbitButton>
        </div>
      </div>
      <!-- 推荐商品 -->
      <ERabbitGoodsRecommend :goods-id="goods.id"></ERabbitGoodsRecommend>
      <div class="goods-footer">
        <!-- 商品详情 -->
        <div class="goods-article">
          <!-- 商品+评价 -->
          <ERabbitGoodsTabs></ERabbitGoodsTabs>
          <ERabbitGoodsWarn></ERabbitGoodsWarn>
        </div>
        <!-- 热榜 -->
        <div class="goods-aside">
          <ERabbitGoodsHot :type="1"></ERabbitGoodsHot>
          <ERabbitGoodsHot :type="2"></ERabbitGoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.goods-info {
  min-height: 600px;
  display: flex;
  background-color: #fff;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px;
    padding-left: 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
