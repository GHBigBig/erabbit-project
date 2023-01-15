<script>
export default {
  name: 'ERabbitAppHeaderCart',
};
</script>
<script setup>
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('cart/findCartList');
</script>
<template>
  <div class="cart">
    <a href="#" class="curr">
      <i class="iconfont icon-cart"></i>
      <em>{{ $store.getters['cart/validTotal'] }}</em>
    </a>
    <div v-if="$store.getters['cart/validTotal'] > 0" class="layer">
      <ul class="list">
        <li
          class="item"
          v-for="item in $store.getters['cart/validList']"
          :key="item.skuId"
        >
          <RouterLink to="">
            <img :src="item.picture" alt="商品图片" />
            <div class="center">
              <p class="name ellipsis-2">
                {{ item.name }}
              </p>
              <p class="attr ellipsis">{{ item.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ item.nowPrice }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new"></i>
        </li>
      </ul>
      <div class="foot">
        <div class="total">
          <p>共{{ $store.getters['cart/validTotal'] }}件商品</p>
          <p class="price">&yen;{{ $store.getters['cart/validAmount'] }}</p>
        </div>
        <ERabbitButton type="plain" style="margin-right: 10px">
          去购物车结算
        </ERabbitButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart {
  position: relative;
  padding-left: 1rem;
  i {
    font-size: 1.5rem;
    line-height: 100%;
  }
  em {
    font-style: normal;
    font-size: 12px;
    color: #fff;
    background: @helpColor;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    padding: 0 0.5rem;
    border-radius: 10px;
  }

  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    width: 400px;
    height: 400px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    position: absolute;
    top: 50px;
    right: -14px;
    z-index: 600;
    opacity: 0;
    transform: translateY(-200px) scale(1, 0);
    transition: all 0.4s 0.2s;
    &::before {
      content: '';
      width: 20px;
      height: 20px;
      background-color: #fff;
      position: absolute;
      top: -10px;
      right: 14px;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }
    .list {
      height: 330px;
      padding: 0 10px;
      overflow-y: scroll;

      // 整个滑动条
      &::-webkit-scrollbar {
        width: 5px;
        // height: 10px;
      }
      // 滚动条轨道
      &::-webkit-scrollbar-track {
        background-color: #f8f8f8;
        // background-color: red;
        border-radius: 10px;
      }
      // 滚动条上的滚动滑块
      &::-webkit-scrollbar-thumb {
        background-color: #eee;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: #ccc;
      }

      .item {
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        &:first-child {
          margin-top: 10px;
        }
        &:hover {
          i {
            opacity: 1;
          }
        }
        a {
          display: flex;
          align-items: center;
          img {
            height: 80px;
            width: 80px;
          }
          .center {
            padding: 0 10px;
            .name {
              font-size: 16px;
            }
            .attr {
              padding-top: 5px;
              color: #999;
            }
          }
          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;
            .price {
              font-size: 16px;
              color: @priceColor;
            }
            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
        i {
          font-size: 16px;
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translateY(-50%);
          opacity: 0;
          transition: all 0.4s 0.2s;
        }
      }
    }
    .foot {
      height: 70px;
      background: #f8f8f8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total {
        margin-left: 10px;
        color: #999;
        .price {
          font-size: 18px;
          color: @priceColor;
        }
      }
    }
  }
}
</style>
