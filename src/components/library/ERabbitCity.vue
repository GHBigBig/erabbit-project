<script>
export default {
  name: 'ERabbitCity',
};
</script>
<script setup>
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
import { computed, ref } from 'vue';

const openState = ref(false);
const optionDiv = ref(null);

function toggleState() {
  //控制城市列表展示
  openState.value = !openState.value;
  console.log('openState.value ', openState.value);
  if (openState.value) {
    //打开城市列表就要获取数据
    open();
  }
}

onClickOutside(optionDiv, () => {
  openState.value = false;
});

const getCityData = () => {
  //获取城市数据
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      //城市数据的存储位置
      resolve(window.cityData);
    } else {
      const url =
        'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json';
      axios
        .get(url)
        .then((res) => {
          window.cityData = res.data;
          resolve(window.cityData);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
const loading = ref(false);
const cityData = ref([]);
const open = () => {
  loading.value = true;
  getCityData().then((res) => {
    cityData.value = res;
    loading.value = false;
  });
};
const currList = computed(() => {
  const currList = cityData.value;
  return currList;
});
</script>
<template>
  <div class="er-city" ref="optionDiv">
    <div class="select" @click="toggleState()">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-if="openState" class="option">
      <div v-if="!cityData?.length" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code">
          {{ item.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.er-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    height: 30px;
    line-height: 28px;
    padding: 0 5px;
    border: 1px solid #e4e4e4;
    margin-left: 10px;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 15px;
    }
  }
  .option {
    width: 542px;
    min-height: 30px;
    line-height: 30px;
    padding: 10px;
    border: 1px solid #e4e4e4;
    margin-left: 10px;
    position: absolute;
    left: 0;
    top: 29px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    > span {
      width: 130px;
      padding: 0 3px;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loadding.gif) no-repeat center;
    }
  }
}
</style>
