<script>
export default {
  name: 'ERabbitCheckout',
};
</script>
<script setup>
import ERabbitCheckoutAddress from './components/ERabbitCheckAddress.vue';
</script>
<template>
  <div class="er-pay-checkout-page">
    <div class="container">
      <ERabbitBread>
        <ERabbitBreadItem to="/">首页</ERabbitBreadItem>
        <ERabbitBreadItem to="/cart">购物车</ERabbitBreadItem>
        <ERabbitBreadItem>填写订单</ERabbitBreadItem>
      </ERabbitBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <ERabbitCheckoutAddress></ERabbitCheckoutAddress>
        </div>

        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <div class="goods">
            <table>
              <thead>
                <tr>
                  <th width="520">商品信息</th>
                  <th width="170">单价</th>
                  <th width="170">数量</th>
                  <th width="170">小计</th>
                  <th width="170">实付</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <RouterLink to="" class="info">
                      <img
                        src="https://yanxuan-item.nosdn.127.net/5b3c61cf75a2480774616f5662a5bccf.jpg"
                        alt="商品图片"
                      />
                      <div class="desc">
                        <p>精酿经典啤酒杯可乐杯气泡水杯两支装</p>
                        <p>规格:意大利精酿酒杯两支</p>
                      </div>
                    </RouterLink>
                  </td>
                  <td>&yen;99.00</td>
                  <td>1</td>
                  <td>&yen;99.00</td>
                  <td>&yen;99.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 配送时间 -->
        <h3 class="box-title">配送方式</h3>
        <div class="box-body">
          <a href="javascript:;" class="my-btn active">
            不限送货时间：周一至周日
          </a>
          <a href="javascript:;" class="my-btn">工作日送货：周一至周五</a>
          <a href="javascript:;" class="my-btn">
            非工作日送货：节假日及周六至周日
          </a>
        </div>

        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a href="javascript:;" class="my-btn">在线支付</a>
          <a href="javascript:;" class="my-btn active">货到付款</a>
          <span class="tip">货到付款需要5元手续费</span>
        </div>

        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>1件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>&yen;99.00</dd>
            </dl>
            <dl>
              <dt>商品运费：</dt>
              <dd>&yen;5.00</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="total-price">&yen;104.00</dd>
            </dl>
          </div>
        </div>

        <!-- 提交订单 -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.er-pay-checkout-page {
  .container {
    .wrapper {
      padding: 0 20px;
      background-color: #fff;

      .box-title {
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #f5f5f5;
        font-weight: normal;
      }
      .box-body {
        padding: 20px 0;

        .goods {
          border: 1px solid #f5f5f5;
          table {
            border-collapse: collapse;
            thead {
              background-color: #f5f5f5;
              th {
                padding: 20px;
                font-weight: normal;
              }
            }
            tbody {
              tr {
                td {
                  padding: 20px;
                  text-align: center;
                }
                .info {
                  display: flex;
                  text-align: left;
                  img {
                    width: 70px;
                    height: 70px;
                  }
                  div {
                    margin-left: 10px;
                    p:last-child {
                      line-height: 24px;
                      color: #999;
                    }
                  }
                }
              }
            }
          }
        }
        .my-btn {
          display: inline-block;
          width: 228px;
          height: 50px;
          border: 1px solid #f5f5f5;
          line-height: 50px;
          margin-right: 25px;
          text-align: center;
          color: #666;
          &.active {
            border-color: @erColor;
          }
        }
        .tip {
          color: @priceColor;
        }
        .total {
          dl {
            display: flex;
            justify-content: flex-end;
            height: 70px;
            line-height: 70px;
            dt {
              width: 80px;
            }
            dd {
              width: 240px;
              padding-right: 70px;
              text-align: right;
              &.total-price {
                font-size: 20px;
                color: @priceColor;
              }
            }
          }
        }
      }
    }
  }
}
</style>
