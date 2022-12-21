<script>
export default {
  name: 'ERabbitGoodsComment',
};
</script>

<script setup>
import { findCommentInfoByGoods } from '@/api/goods';
import { ref } from 'vue';

const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});

const currTagIndex = ref(0);
const commentInfo = ref(null);
const getCommentInfo = () => {
  findCommentInfoByGoods(props.goods.id).then((data) => {
    data.result.tags.unshift({
      type: 'img',
      title: '有图',
      tagCount: data.result.hasPictureCount,
    });
    data.result.tags.unshift({
      type: 'all',
      title: '全部评价',
      tagCount: data.result.evaluateCount,
    });
    commentInfo.value = data.result;
  });
};
getCommentInfo();
</script>

<template>
  <div class="goods-comment">
    <div class="header">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(item, i) in commentInfo.tags"
            :key="item.title"
            :class="{ active: currTagIndex === i }"
            @click="currTagIndex = i"
          >
            {{ item.title }} {{ item.tagCount }}
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
    <div class="list"></div>
  </div>
</template>

<style scoped lang="less">
.goods-comment {
  .header {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      padding: 20px;
      display: flex;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        width: 100px;
        line-height: 42px;
        text-align: right;
        font-weight: bold;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          line-height: 40px;
          border: 1px solid #e4e4e4;
          border-radius: 4px;
          margin-left: 20px;
          margin-bottom: 20px;
          text-align: center;
          background-color: #f5f5f5;
          color: #999;
          &:hover {
            border-color: @erColor;
            background-color: lighten(@erColor, 50%);
            color: @erColor;
          }
          &.active {
            border-color: @erColor;
            background-color: @erColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @erColor;
      }
    }
  }
}
</style>
