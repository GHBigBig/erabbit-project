<script>
export default {
  name: 'ERabbitCartIndex',
};
</script>
<script setup>
import ERabbitAppFooter from '@/components/ERabbitAppFooter.vue';
import ERabbitAppHearder from '@/components/ERabbitAppHearder.vue';
import { useStore } from 'vuex';
import ERabbitGoodsRecommend from '../goods/components/ERabbitGoodsRecommend.vue';
import Confirm from '@/components/library/Confirm';
import ERabbitCartSKU from './components/ERabbitCartSKU.vue';
import Message from '@/components/library/Message';
import router from '@/router';

//阻止事件传播
function f(e) {
  e.stopImmediatePropagation();
}

const store = useStore();

const checkOne = (skuId, selected) => {
  store.dispatch('cart/updateCart', { skuId, selected });
};

const checkAll = (selected) => {
  store.dispatch('cart/checkAllCart', selected);
};

const deleteOne = (skuId) => {
  Confirm({ text: '您确认从购物车删除该商品吗？' })
    .then(() => {
      // console.log('点击确认');
      store.dispatch('cart/deleteCart', skuId);
    })
    .catch(() => {
      // console.log('点击取消');
    });
};

const deleteBatch = (isClear) => {
  if (store.getters['cart/selectedList']?.length <= 0) {
    Message({ type: 'error', text: '请勾选有效商品项！' });
    return;
  }
  Confirm({
    text: `您确认从购物车中${isClear ? '失效' : '删除'}删除选中的商品吗？`,
  })
    .then(() => {
      store.dispatch('cart/batchDeleteCart', isClear);
    })
    .catch(() => {
      // console.log('取消删除');
    });
};

const changeCount = (skuId, count) => {
  store.dispatch('cart/updateCart', { skuId, count });
};

const updateCartSku = (oldSkuId, newSku) => {
  store.dispatch('cart/updateCartSku', { oldSkuId, newSku });
};

const goCheckout = () => {
  //至少选中一件商品
  if (store.getters['cart/selectedTotal'] === 0) {
    return Message({ text: '至少选中一件商品才能结算' });
  }
  //判断是否登录，
  if (!store.state.user.profile.token) {
    Confirm({ text: '您还未登录，您是否去登录？' })
      .then(() => {
        //点击确认
        router.push('/login');
      })
      .catch(() => {});
  } else {
    router.push('/member/checkout');
  }
};
</script>

<template>
  <ERabbitAppHearder></ERabbitAppHearder>
  <div class="er-cart-page">
    <div class="container">
      <ERabbitBread>
        <ERabbitBreadItem to="/">首页</ERabbitBreadItem>
        <ERabbitBreadItem>购物车</ERabbitBreadItem>
      </ERabbitBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <ERabbitCheckBox
                  :modelValue="$store.getters['cart/isCheckAll']"
                  @update:modelValue="checkAll"
                >
                  全选
                </ERabbitCheckBox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr
              v-for="item in $store.getters['cart/validList']"
              :key="item.skuId"
            >
              <td width="120">
                <ERabbitCheckBox
                  :modelValue="item.selected"
                  @update:modelValue="($event) => checkOne(item.skuId, $event)"
                ></ERabbitCheckBox>
              </td>
              <td width="400">
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="商品图片" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ item.name }}
                    </p>
                    <!-- 选择规格组件 -->
                    <!-- <p class="attr">{{ item.attrsText }}</p> -->
                    <ERabbitCartSKU
                      :attrs-text="item.attrsText"
                      :sku-id="item.skuId"
                      @change="($event) => updateCartSku(item.skuId, $event)"
                    ></ERabbitCartSKU>
                  </div>
                </div>
              </td>
              <td width="220">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价
                  <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                </p>
              </td>
              <td width="180">
                <ERabbitNumerBox
                  :modelValue="item.count"
                  @update:modelValue="changeCount(item.skuId, $event)"
                ></ERabbitNumerBox>
              </td>
              <td width="180" class="price">
                <p>&yen;{{ (item.nowPrice * 100 * item.count) / 100 }}</p>
              </td>
              <td width="140" class="operation">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p class="del">
                  <a href="javascript:;" @click="deleteOne(item.skuId)">
                    删除
                  </a>
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="i in 3" :key="i">
              <td>
                <ERabbitCheckBox @click.capture="f" style="color: #eee" />
              </td>
              <td>
                <div class="goods">
                  <a href="javascript:void(0);"
                    ><img
                      src="https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png"
                      alt=""
                  /></a>
                  <div>
                    <p class="name ellipsis">
                      和手足干裂说拜拜 ingrams手足皲裂修复霜
                    </p>
                    <p class="attr">颜色：粉色 尺寸：14cm 产地：中国</p>
                  </div>
                </div>
              </td>
              <td><p>&yen;200.00</p></td>
              <td>1</td>
              <td class="price"><p>&yen;200.00</p></td>
              <td class="operation">
                <p class="del"><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="action">
        <div class="batch">
          <ERabbitCheckBox
            type="primary"
            :modelValue="$store.getters['cart/isCheckAll']"
            @update:modelValue="checkAll"
          >
            全选
          </ERabbitCheckBox>
          <a href="javascript:;" @click="deleteBatch(false)">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="deleteBatch(true)">清空失效商品</a>
        </div>
        <div class="total">
          共{{ $store.getters['cart/validTotal'] }}件商品，已选择
          {{ $store.getters['cart/selectedTotal'] }}件，商品合计：
          <span>&yen;{{ $store.getters['cart/selectedAmount'] }} </span>
          <ERabbitButton type="primary" @click="goCheckout">
            下单结算
          </ERabbitButton>
        </div>
      </div>
      <ERabbitGoodsRecommend></ERabbitGoodsRecommend>
    </div>
  </div>
  <ERabbitAppFooter></ERabbitAppFooter>
</template>

<style scoped lang="less">
.er-cart-page {
  padding-bottom: 20px;
  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

  table {
    border-collapse: collapse;
    background-color: #fff;
    text-align: center;
    color: #666;
    thead {
      height: 70px;
      border-bottom: 1px solid #f5f5f5;
      th {
        font-size: 16px;
        font-weight: normal;
      }
    }
    tbody {
      &:last-child {
        filter: grayscale(85%);
      }
      &:last-child * {
        cursor: not-allowed;
      }
      tr {
        border-bottom: 1px solid #f5f5f5;
        td {
          &.price {
            color: @priceColor;
            font-size: 16px;
          }
          &.operation {
            p {
              margin-bottom: 5px;
              cursor: pointer;
              &.del a {
                color: @erColor;
              }
            }
          }
          .goods {
            padding: 10px;
            display: flex;
            align-items: center;
            img {
              height: 100px;
              width: 100px;
            }
            > div {
              margin-left: 10px;
              text-align: left;
              .name {
                width: 260px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  .action {
    padding: 15px 30px;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 16px;

    .batch {
      a {
        padding-left: 15px;
      }
    }
    .total {
      span {
        padding-right: 10px;
        font-size: 18px;
        font-weight: bold;
        color: @priceColor;
      }
    }
  }
}

// 控制 checkbox 的颜色
.er-checkbox {
  color: @erColor;
}
</style>
