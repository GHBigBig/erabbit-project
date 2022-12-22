<script>
export default {
  name: 'ERabbitGoodsCommentImage',
};
</script>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  pictures: {
    type: Array,
    default: () => {},
  },
});

const currImage = ref(null);
</script>

<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        v-for="url in props.pictures"
        :key="url"
        :class="{ active: currImage === url }"
        @click="currImage = url"
      >
        <img :src="url" alt="评论图片" />
      </a>
    </div>
    <div v-if="currImage" class="preview">
      <img :src="currImage" alt="商品评论图片" />
      <i class="iconfont icon-close-new" @click="currImage = null"></i>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-comment-image {
  .list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.active {
        border-color: @erColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    margin-bottom: 20px;
    background-color: #f8f8f8;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    i {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
