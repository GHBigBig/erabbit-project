<script setup>
import { reactive } from 'vue';

const emits = defineEmits(['sort-change']);

const sortParams = reactive({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null,
});

const SortPrice = 'price'; //价格排序
const SortPushlish = 'publishTime'; //最新商品排序
const SortOrder = 'orderNum'; //最高人气排序
const SortEvaluate = 'evaluateNum'; //评论最多排序

const changeSort = (sortField) => {
  if (SortPrice === sortField) {
    sortParams.sortField = SortPrice;

    //首次排序为 降序
    if (sortParams.sortMethod === null) {
      sortParams.sortMethod = 'desc';
    } else {
      sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc';
    }
  } else {
    //如果排序逻辑未更改，停止操作
    if (sortParams.sortField === sortField) {
      return;
    }
    sortParams.sortField = sortField;
    sortParams.sortMethod = null;
  }
  emits('sort-change', sortParams);
};

const changeCheck = (sortParams) => {
  console.log('changeCheck sort-change：', sortParams);
  emits('sort-change', sortParams);
};
</script>
<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
      >
        默认排序
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === SortPushlish }"
        @click="changeSort(SortPushlish)"
      >
        最新商品
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === SortOrder }"
        @click="changeSort(SortOrder)"
      >
        最高人气
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === SortEvaluate }"
        @click="changeSort(SortEvaluate)"
      >
        评论最多
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === SortPrice }"
        @click="changeSort(SortPrice)"
      >
        价格排序
        <i
          class="arrow up"
          :class="{ active: sortParams.sortMethod === 'asc' }"
        ></i>
        <i
          class="arrow down"
          :class="{ active: sortParams.sortMethod === 'desc' }"
        ></i>
      </a>
    </div>
    <div class="check">
      <ERabbitCheckBox
        :modelValue="sortParams.inventory"
        @update:modelValue="
          (val) => {
            sortParams.inventory = val;
            changeCheck(sortParams);
          }
        "
      >
        仅显示有货商品
      </ERabbitCheckBox>
      <ERabbitCheckBox
        :modelValue="sortParams.onlyDiscount"
        @update:modelValue="
          (val) => {
            sortParams.onlyDiscount = val;
            changeCheck(sortParams);
          }
        "
      >
        仅显示特惠商品
      </ERabbitCheckBox>
    </div>
  </div>
</template>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sort {
    display: flex;
    a {
      position: relative;
      height: 30px;
      line-height: 28px;
      padding: 0 20px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      border-radius: 2px;
      color: #999;
      transition: all 0.6s;
      &.active:not(:last-of-type) {
        background: @erColor;
        border-color: @erColor;
        color: #fff;
      }
    }
    .arrow {
      position: absolute;
      border: 5px solid transparent;
      right: 8px;
      &.up {
        top: 3px;
        border-bottom-color: #bbb;
        &.active {
          border-bottom-color: @erColor;
        }
      }
      &.down {
        top: 15px;
        border-top-color: #bbb;
        &.active {
          border-top-color: @erColor;
        }
      }
    }
  }
  .check {
    .er-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
