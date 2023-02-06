<script>
export default {
  name: 'ERabbitCity',
};
</script>
<script setup>
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
  address: {
    type: Object,
    default: () => {},
  },
  placeholder: {
    type: String,
    default: '请选择配送地区',
  },
});
const emits = defineEmits(['update:address']);

const openState = ref(false); //城市列表是否展示
const optionDiv = ref(null); //城市组件元素元素 dom
const addressResult = ref(props.address); //存储地址信息，使用 prop address 初始化，对象prop内部的值仍可以被更改

//控制城市列表展示
function toggleState() {
  openState.value = !openState.value;
  console.log('openState.value ', openState.value);
  if (openState.value) {
    //打开城市列表就要获取数据
    open();
  }
}

//点击城市组件外 关闭城市展示
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
const loading = ref(false); //城市数据加载状态
const cityData = ref([]); //城市数据
const open = () => {
  loading.value = true;
  getCityData().then((res) => {
    cityData.value = res;
    currList.value = res;
    loading.value = false;
  });
};
//计算得到当前界面显示的行政区
const currList = ref([]);

const checkAddress = (location) => {
  switch (location.level) {
    case 0:
      addressResult.value.provinceCode = location.code;
      addressResult.value.provinceName = location.name;
      currList.value = location.areaList;
      break;
    case 1:
      addressResult.value.cityCode = location.code;
      addressResult.value.cityName = location.name;
      currList.value = location.areaList;
      break;
    case 2:
      addressResult.value.countyCode = location.code;
      addressResult.value.countyName = location.name;
      addressResult.value.fullLocation = `${addressResult.value.provinceName} ${addressResult.value.cityName} ${addressResult.value.countyName}`;
      emits('update:address', addressResult);
      openState.value = false;
      break;
    default:
      break;
  }
};
</script>
<template>
  <div class="er-city" ref="optionDiv">
    <div class="select" @click="toggleState()">
      <span v-if="!addressResult?.fullLocation" class="placeholder">
        {{ props.placeholder }}
      </span>
      <span v-else class="value">{{ addressResult.fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-if="openState" class="option">
      <div v-if="!cityData?.length" class="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          @click="checkAddress(item)"
        >
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
