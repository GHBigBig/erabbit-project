<script>
export default {
  name: 'ERabbitPagination',
};
</script>
<script setup>
//计算是否禁用的方法
//需要显示几个按钮
//激活当前页面的样式

import { computed, ref, watch } from 'vue';
const props = defineProps({
  dataTotal: {
    type: Number,
    default: 100,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  severalPageBtn: {
    type: Number,
    default: 5,
  },
  currPage: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(['changePage']);

const dataTotal = ref(props.dataTotal); //一共多少条数据
const pageSize = ref(props.pageSize); //每页的条数
const showSeveralPage = ref(props.severalPageBtn); //显示多个页码

const maxPage = computed(() => {
  return Math.ceil(dataTotal.value / pageSize.value);
}); //最大的页码
const minPage = computed(() => {
  return maxPage.value > 1 ? 1 : maxPage.value;
}); //最小的页码
const currPage = ref(1); //当前页码
const startPage = computed(() => {
  return currPage.value - Math.floor(showSeveralPage.value / 2) < 1
    ? 1
    : currPage.value - Math.floor(showSeveralPage.value / 2);
}); //显示页码的最小页码
const endPage = computed(() => {
  return startPage.value + showSeveralPage.value - 1 > maxPage.value
    ? maxPage.value
    : startPage.value + showSeveralPage.value - 1;
}); //显示页码的最大页码

function changeCurrPage(index) {
  console.log(index);
  //确保 index 的合法性
  if (index < minPage.value || index > maxPage.value) {
    return;
  }
  currPage.value = index;
  emits('changePage', { currPage: currPage.value });
}

watch(
  () => props.currPage,
  () => {
    currPage.value = props.currPage;
  }
);
</script>
<template>
  <div class="er-pagination">
    <a
      href="javascript:;"
      :class="{ disabled: minPage === currPage }"
      @click="changeCurrPage(currPage - 1)"
    >
      上一页
    </a>

    <span v-if="startPage > minPage">...</span>
    <a
      href="javascript:;"
      v-for="item in endPage - startPage + 1"
      :key="item"
      :class="{ active: startPage + item - 1 === currPage }"
      @click="changeCurrPage(startPage + item - 1)"
    >
      {{ startPage + item - 1 }}
    </a>
    <span v-if="maxPage > endPage">...</span>

    <a
      href="javascript:;"
      :class="{ disabled: maxPage === currPage }"
      @click="changeCurrPage(currPage + 1)"
    >
      下一页
    </a>
  </div>
</template>

<style scoped lang="less">
.er-pagination {
  padding: 30px;
  display: flex;
  justify-content: center;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @erColor;
    }
    &.active {
      background: @erColor;
      border-color: @erColor;
      color: #fff;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
