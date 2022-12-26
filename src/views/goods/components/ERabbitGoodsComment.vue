<script>
export default {
  name: 'ERabbitGoodsComment',
};
</script>

<script setup>
import { findCommentInfoByGoods, findCommentListByGoods } from '@/api/goods';
import { reactive, ref, watch } from 'vue';
import ERabbitGoodsCommentImage from './ERabbitGoodsCommentImage.vue';

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

//筛选条件
const reqParams = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  sortField: null,
  total: 0, //评论总条数
});
const changeSort = (type) => {
  reqParams.sortField = type;
  reqParams.page = 1;
};
const changeTag = (i) => {
  currTagIndex.value = i;
  //标签条件
  const currTag = commentInfo.value.tags[i];
  if (currTag.type === 'all') {
    //查看全部
    reqParams.hasPicture = false;
    reqParams.tag = null;
  } else if (currTag.type === 'img') {
    //查看有图
    reqParams.hasPicture = true;
    reqParams.tag = null;
  } else {
    //查看标签分类
    reqParams.hasPicture = false;
    reqParams.tag = currTag.title;
  }
  reqParams.page = 1;
};

//初始化或者筛选条件改变后，获取列表数据
const commentList = ref([]);
watch(
  reqParams,
  async () => {
    const data = await findCommentListByGoods(props.goods.id, reqParams);
    commentList.value = data.result.items;
    reqParams.total = data.result.counts;
  },
  { immediate: true }
);

//处理规格
const formatSpecs = (specs) => {
  return specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, '').trim();
};

//处理用户昵称
const formatNickname = (nickname) => {
  return nickname.substr(0, 1) + '****' + nickname.substr(-1);
};

const pageChange = (param) => {
  console.debug(param);
  reqParams.page = param.currPage;
};
</script>

<template>
  <div class="goods-comment">
    <div class="header">
      <div class="data">
        <p>
          <span>{{ commentInfo?.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo?.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(item, i) in commentInfo?.tags"
            :key="item.title"
            :class="{ active: currTagIndex === i }"
            @click="changeTag(i)"
          >
            {{ item.title }} {{ item.tagCount }}
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        @click="changeSort(null)"
      >
        默认
      </a>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="changeSort('praiseCount')"
      >
        最新
      </a>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="changeSort('createTime')"
      >
        最热
      </a>
    </div>
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="用户头像照片" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i" class="iconfont icon-wjx01"></i>
            <i
              v-for="i in 5 - item.score"
              :key="item.score + i"
              class="iconfont icon-wjx02"
            ></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 评论图片预览组件 -->
          <ERabbitGoodsCommentImage
            v-if="item?.pictures.length"
            :pictures="item.pictures"
          ></ERabbitGoodsCommentImage>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan">
              <i class="iconfont icon-dianzan"></i>
              {{ item.praiseCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <ERabbitPagination
      v-if="commentList?.length"
      :dataTotal="reqParams.total"
      :pageSize="reqParams.pageSize"
      :currPage="reqParams.page"
      @change-page="pageChange"
    ></ERabbitPagination>
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
  .list {
    padding: 0 20px;
    .item {
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
        .text {
          color: #666;
          line-height: 24px;
        }
        .time {
          color: #999;
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
