<script setup>
import ERabbitHomePanel from './ERabbitHomePanel.vue';
import ERabbitHomeGoods from './ERabbitHomeGoods.vue';
import { findGoods } from '@/api/home';
import { useLazyData } from '@/hooks';

const { target, result: list } = useLazyData(findGoods);
</script>
<template>
  <div class="home-product" ref="target">
    <ERabbitHomePanel
      v-for="category in list"
      :title="category.name"
      :key="category.id"
    >
      <template #right>
        <div class="sub">
          <RouterLink to="/" v-for="sub in category.children" :key="sub.id">
            {{ sub.name }}
          </RouterLink>
        </div>
        <ERabbitMore></ERabbitMore>
      </template>
      <div class="box">
        <RouterLink to="/" class="cover">
          <img alt="分类图片" v-lazyload="category.picture" />
          <strong class="label">
            <span>{{ category.name }}馆</span>
            <span>{{ category.saleInfo }}</span>
          </strong>
        </RouterLink>

        <ul class="goods-list">
          <li v-for="item in category.goods" :key="item.id">
            <ERabbitHomeGoods :goods="item"></ERabbitHomeGoods>
          </li>
        </ul>
      </div>
    </ERabbitHomePanel>
  </div>
</template>

<style scoped lang="less">
.home-product {
  height: 2900px;
  background-color: #fff;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @erColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      height: 610px;
      width: 240px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        position: absolute;
        left: 0;
        top: 50%;
        line-height: 66px;
        font-size: 18px;
        color: #fff;
        font-weight: normal;
        transform: translate3d(0, -50%, 0);
        display: flex;
        span {
          text-align: center;
          &:first-child {
            width: 66px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-top: 10px;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        &:nth-of-type(-n + 4) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
