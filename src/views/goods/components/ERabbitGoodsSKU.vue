<script>
export default {
  name: 'ERabbitGoodsSKU',
};
</script>
<script setup>
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], sku: [] }),
  },
});

const clickSpecs = (item, val) => {
  if (val.selected) {
    val.selected = false;
  } else {
    item.values.forEach((bv) => void (bv.selected = false));
    val.selected = true;
  }
};
</script>
<template>
  <div class="goods-sku">
    <dl v-for="spec in props.goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="item in spec.values" :key="item.name">
          <img
            v-if="item.picture"
            :class="{ selected: item.selected }"
            :src="item.picture"
            :alt="item.name"
            @click="clickSpecs(spec, item)"
          />
          <span
            v-else
            class="{selected:item.selected }"
            @click="clickSpecs(spec, item)"
          >
            {{ item.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 20px;
  cursor: pointer;
  &.selected {
    border-color: @erColor;
  }
  &.disabled {
    border-style: dashed;
    cursor: not-allowed;
    opacity: 0.6;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin();
      }
      > span {
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        display: inline-block;
        .sku-state-mixin();
      }
    }
  }
}
</style>
