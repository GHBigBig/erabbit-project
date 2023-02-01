<script>
export default {
  name: 'ERabbitCheckAddress',
};
</script>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const showAddress = ref(null);
if (props.list.length > 0) {
  const defaultAddress = props.list.find((item) => item.isDefault === 1);
  if (defaultAddress) {
    showAddress.value = defaultAddress;
  } else {
    showAddress.value = computed(() => props.list[0]);
  }
}
</script>
<template>
  <div class="er-checkout-address">
    <div class="text">
      <ul v-if="showAddress">
        <li><span>收货人：</span>{{ showAddress?.receiver }}</li>
        <li><span>联系方式：</span>{{ showAddress?.contact }}</li>
        <li>
          <span>收货地址：</span>
          {{
            showAddress?.fullLocation.replace(/ /g, '') + showAddress?.address
          }}
        </li>
      </ul>
      <div v-else class="none">您需要先添加收货地址才可提交订单</div>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <ERabbitButton class="btn" style="margin-right: 10px">
        修改地址
      </ERabbitButton>
      <ERabbitButton class="btn">添加地址</ERabbitButton>
    </div>
  </div>
</template>
<style scoped lang="less">
.er-checkout-address {
  display: flex;
  padding: 20px;
  border: 1px solid #f5f5f5;
  .text {
    flex: 2;
    display: flex;
    ul {
      flex: 3;
      li {
        height: 30px;
        span {
          color: #999;
        }
      }
    }
    a {
      flex: 1;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      color: @erColor;
    }
    .none {
      flex: 3;
      height: 90px;
      line-height: 90px;
      text-align: center;
      color: @priceColor;
      font-size: 18px;
    }
  }
  .action {
    flex: 1;
    height: 90px;
    line-height: 90px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      font-size: 14px;
    }
  }
}
</style>
