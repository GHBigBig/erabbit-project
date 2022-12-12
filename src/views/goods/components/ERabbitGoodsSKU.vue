<script>
export default {
  name: 'ERabbitGoodsSKU',
};
</script>
<script setup>
import bwPowerSet from '@/vender/bwPowerSet';
import { computed } from 'vue';

const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], sku: [] }),
  },
  skuid: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['change']);

//根据传入的 skuId 来选中
const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId);
  if (sku) {
    goods.specs.forEach((spec, i) => {
      spec.values.forEach((val) => {
        val.selected = val.valueName === sku.specs[i].valueName;
      });
    });
  }
};
initSelectedStatus(props.goods, props.skuid);

const spliter = '★';
//生成sku路径词典
const producePathMap = (skus) => {
  const pathMap = {};
  skus.forEach((sku) => {
    if (sku.inventory) {
      const specArr = sku.specs.map((spec) => spec.valueName);

      const specSet = bwPowerSet(specArr);
      specSet.forEach((set) => {
        if (pathMap[set.join(spliter)]) {
          pathMap[set.join(spliter)].push(sku.id);
        } else {
          pathMap[set.join(spliter)] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};

const pathMap = computed(() => producePathMap(props.goods.skus)); //路径字典
/**
 * 获取用户选择的规格
 * @param {Object} specs 商品规格
 */
const getSelectArr = (specs) => {
  const selectedArr = [];
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((val) => val.selected);
    selectedArr.push(selectedVal ? selectedVal.name : undefined);
  });
  return selectedArr;
};

const updateDisabledStatus = (specs, pathMap) => {
  specs?.forEach((spec, i) => {
    const selectedArr = getSelectArr(specs);
    spec.values.forEach((val) => {
      if (val.selected) {
        return;
      } else {
        selectedArr[i] = val.name;

        val.disabled =
          !pathMap.value[selectedArr.filter((v) => v).join(spliter)];
      }
    });
  });
};
updateDisabledStatus(props.goods.specs, pathMap);

/**
 * 选中商品的 spec 某一属性时进行标记
 * @param {Object} item 商品 spec
 * @param {Object} val 商品 spec 具体的一个属性
 */
const clickSpecs = (item, val) => {
  //选中处理逻辑
  if (val.disabled) {
    return;
  }
  if (val.selected) {
    val.selected = false;
  } else {
    item.values.forEach((bv) => void (bv.selected = false));
    val.selected = true;
  }
  //更新商品的禁用状态
  updateDisabledStatus(props.goods.specs, pathMap);
  //触发 change 事件将 sku 数据传出去
  const selectedArr = getSelectArr(props.goods.specs).filter((v) => v);
  //判断是一下是否完成了商品的规格的选择
  if (selectedArr.length === props.goods.specs.length) {
    const skuIds = pathMap[selectedArr.join(spliter)];
    const sku = props.goods.skus.find((sku) => sku.id === skuIds[0]);
    emits('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce(
        (p, n) => `${p} ${n.name} ${n.valueName}`,
        ''
      ),
    });
  } else {
    emits('change', '');
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
            :class="{ selected: item.selected, disabled: item.disabled }"
            :src="item.picture"
            :alt="item.name"
            @click="clickSpecs(spec, item)"
          />
          <span
            v-else
            :class="{ selected: item.selected, disabled: item.disabled }"
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
