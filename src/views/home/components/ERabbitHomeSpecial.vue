<script setup>
import ERabbitHomePanel from './ERabbitHomePanel.vue';
import { findSpecial } from '@/api/home';
import { useLazyData } from '@/hooks';

const { target: homeSpecial, result: list } = useLazyData(findSpecial);
</script>

<template>
  <ERabbitHomePanel title="最新专题">
    <template #right>
      <ERabbitMore></ERabbitMore>
    </template>
    <div ref="homeSpecial">
      <div class="special-list" v-if="list?.length">
        <div
          class="special-item"
          ref="homeSpecial"
          v-for="item in list"
          :key="item.id"
        >
          <RouterLink to="/">
            <img :src="item.cover" alt="最新专题图片" />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{ item.title }}</span>
                <span class="sub ellipsis">{{ item.summary }}</span>
              </p>
              <span class="price">&yen;{{ item.lowestPrice }}起</span>
            </div>
          </RouterLink>
          <div class="footer">
            <span class="like">
              <i class="iconfont icon-hart1"></i>{{ item.collectNum }}
            </span>
            <span class="view">
              <i class="iconfont icon-see"></i>{{ item.viewNum }}
            </span>
            <span class="reply">
              <i class="iconfont icon-message"></i>{{ item.replyNum }}
            </span>
          </div>
        </div>
      </div>
      <div class="special-list" v-else>
        <ERabbitSkeleton
          animated
          width="404px"
          height="100%"
          bg="#e4e4e4"
          v-for="i in 3"
          :key="i"
        ></ERabbitSkeleton>
      </div>
    </div>
  </ERabbitHomePanel>
</template>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
  .special-list {
    height: 380px;
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
    .special-item {
      width: 404px;
      height: 100%;
      background: #fff;
      .hoverShadow();
      a {
        display: block;
        width: 100%;
        height: 288px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .meta {
          background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8),
            transparent 50%
          );
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 288px;
          .title {
            width: 70%;
            height: 70px;
            position: absolute;
            bottom: 0;
            left: 0;
            padding-left: 16px;
            .top {
              display: block;
              color: #fff;
              font-size: 22px;
            }
            .sub {
              display: block;
              color: #999;
              font-size: 19px;
            }
          }
          .price {
            position: absolute;
            bottom: 25px;
            right: 16px;
            background: #fff;
            color: @priceColor;
            border-radius: 2px;
            font-size: 17px;
            line-height: 1;
            padding: 4px 8px 4px 7px;
          }
        }
      }
      .footer {
        height: 72px;
        line-height: 72px;
        padding: 0 20px;
        font-size: 16px;
        i {
          display: inline-block;
          width: 15px;
          height: 14px;
          margin-right: 5px;
          color: #999;
        }
        .like,
        .view {
          float: left;
          margin-right: 25px;
          vertical-align: middle;
        }
        .reply {
          float: right;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
