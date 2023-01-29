<script>
export default {
  name: 'ERabbitCartSKU',
  components: { ERabbitGoodsSKU },
};
</script>
<script setup>
import ERabbitGoodsSKU from '@/views/goods/components/ERabbitGoodsSKU.vue';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { getSpecsAndSkus } from '@/api/goods';

const props = defineProps({
  attrsText: {
    type: String,
    default: '',
  },
  skuId: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['change']);

const visible = ref(false);
const goods = ref(null);

const show = () => {
  visible.value = true;
  getSpecsAndSkus(props.skuId).then((data) => {
    goods.value = data.result;
  });
};
const hide = () => {
  visible.value = false;
  goods.value = null;
};
const toggle = () => {
  visible.value ? hide() : show();
};

const target = ref(null);

onClickOutside(target, () => {
  hide();
});

const currSku = ref(null);
const changeSku = (sku) => {
  currSku.value = sku;
};
const submit = () => {
  //更 sku 的前提式，有 sku 信息，sku 信息完整，sku 中需与当前 props.skuId 不一致
  if (
    currSku.value &&
    currSku.value.skuId &&
    currSku.value.skuId !== props.skuId
  ) {
    emits('change', currSku.value);
    hide();
  }
};
</script>
<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{ props.attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="!goods" class="loading"></div>
      <ERabbitGoodsSKU
        v-if="goods"
        :goods="goods"
        :skuid="props.skuId"
        @change="changeSku"
      ></ERabbitGoodsSKU>
      <ERabbitButton
        v-if="goods"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="submit()"
      >
        确认
      </ERabbitButton>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  padding: 0 6px;
  border: 1px solid #f5f5f5;
  margin-top: 10px;
  position: relative;
  display: inline-block;
  .attrs {
    line-height: 26px;
    span {
      max-width: 230px;
      color: #999;
    }
    i {
      margin-left: 5px;
    }
  }
  .layer {
    width: 400px;
    padding: 20px;
    border: 1px solid @erColor;
    border-radius: 4px;
    box-shadow: 2px 2px 4px lighten(@erColor, 50%);
    background-color: #fff;
    position: absolute;
    top: 40px;
    left: -1px;
    z-index: 10;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-top: 1px solid @erColor;
      border-left: 1px solid @erColor;
      background-color: #fff;
      position: absolute;
      left: 12px;
      top: -8px;
      transform: scale(0.8, 1) rotate(45deg);
    }

    .loading {
      height: 224px;
      background: url(@/assets/images/loadding.gif) no-repeat center;
    }
  }
}
</style>
