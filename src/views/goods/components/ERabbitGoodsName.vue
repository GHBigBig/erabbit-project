<script>
export default {
  name: 'ERabbitGoodsName',
};
</script>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});

//默认地址
const address = ref({
  provinceCode: '110000',
  cityCode: '119900',
  countyCode: '110101',
  fullLocation: '北京市 市辖区 东城区',
});

//商品数据中含默认地址
if (props.goods.userAddress) {
  const defaultAddr = props.goods.userAddress.find(
    (addr) => addr.isDefault === 1
  );
  if (defaultAddr) {
    address.value.provinceCode = defaultAddr.provinceCode;
    address.value.cityCode = defaultAddr.cityCode;
    address.value.countyCode = defaultAddr.countyCode;
    address.value.fullLocation = defaultAddr.fullLocation;
  }
}
</script>
<template>
  <p class="goods-name">{{ props.goods.name }}</p>
  <p class="goods-desc">{{ props.goods.desc }}</p>
  <p class="goods-price">
    <span>{{ props.goods.price }}</span>
    <span>{{ props.goods.oldPrice }}</span>
  </p>
  <div class="goods-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至</dd>
      <ERabbitCity v-model:address="address"></ERabbitCity>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>
<style scoped lang="less">
.goods-name {
  font-size: 22px;
}
.goods-desc {
  margin-top: 10px;
  color: #999;
}

.goods-price {
  margin-top: 10px;
  span {
    &::before {
      content: '¥';
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
    }
  }
}

.goods-service {
  width: 500px;
  margin-top: 10px;
  padding: 20px 10px 0px 10px;
  background: #f5f5f5;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: '•';
            color: @erColor;
            margin-right: 2px;
          }
        }
      }
      a {
        color: @erColor;
      }
    }
  }
}
</style>
