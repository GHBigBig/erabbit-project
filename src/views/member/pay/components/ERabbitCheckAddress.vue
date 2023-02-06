<script>
export default {
  name: 'ERabbitCheckAddress',
};
</script>
<script setup>
import { computed, ref } from 'vue';
import ERabbitAddressEdit from './ERabbitAddressEdit.vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

//显示地址，首选显示默认地址
const showAddress = ref(null);
if (props.list.length > 0) {
  const defaultAddress = props.list.find((item) => item.isDefault === 1);
  if (defaultAddress) {
    showAddress.value = defaultAddress;
  } else {
    showAddress.value = computed(() => props.list[0]);
  }
}

//控制收获地址地址切换框显示与否
const dialogVisible = ref(false);

// 添加收货地址
const addressEdit = ref(null);
const openAddressEdit = () => {
  addressEdit.value.open();
};
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
      <ERabbitButton
        class="btn"
        style="margin-right: 10px"
        @click="dialogVisible = true"
      >
        切换地址
      </ERabbitButton>
      <ERabbitButton class="btn" @click="openAddressEdit">
        添加地址
      </ERabbitButton>
    </div>
    <ERabbitDialog v-model:visible="dialogVisible">
      <ul v-for="item in props.list" :key="item.id">
        <li>收货人：{{ item.receiver }}</li>
        <li>联系方式：{{ item.contact }}</li>
        <li>
          收货地址：{{ item.fullLocation.replace(/ /g, '') + item.address }}
        </li>
      </ul>
      <template #footer>
        <ERabbitButton
          @click="dialogVisible = false"
          style="margin-right: 20px"
          type="gray"
        >
          取消
        </ERabbitButton>
        <ERabbitButton @click="dialogVisible = false" type="primary">
          确认
        </ERabbitButton>
      </template>
    </ERabbitDialog>
    <ERabbitAddressEdit></ERabbitAddressEdit>
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

.er-dialog {
  .body {
    padding: 20px 40px;
    ul {
      padding: 10px;
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      li {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
