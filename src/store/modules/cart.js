//购物车
// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective

import { getNewCartGoods } from '@/api/cart';

// 线上：比上面多 isCollect 有用 discount 无用 两项项信息
export default {
  namespaced: true,
  state: () => {
    return {
      list: [],
    };
  },
  getters: {
    //派生的有效的商品列表
    vaildList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    //派生的有效的商品件数
    vaildTotal(state, getters) {
      return getters.vaildList.reduce((p, c) => p + c.count, 0);
    },
    //有效的商品总金额
    vaildAmount(state, getters) {
      return (
        getters.vaildList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) /
        100
      );
    },
  },
  mutations: {
    // mutations 必须同步执行
    insertCart(state, goods) {
      //findIndex，返回-1否则返回的是数组中第一个符合条件的值
      const sameIndex = state.list.findIndex(
        (item) => item.skuId === goods.skuId
      );

      if (sameIndex >= 0) {
        // 商品信息累计
        goods.count = state.list[sameIndex].count + goods.count;
        console.log(goods);
        // 删除goods
        state.list.splice(sameIndex, 1);
        console.log(state.list);
      }
      state.list.unshift(goods);
      console.log(state.list);
    },
    //修改购物车商品
    updateCart(state, goods) {
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId);
      //goods 中的字段有可能不完整
      for (let key in goods) {
        if (
          goods[key] !== null &&
          goods[key] !== undefined &&
          goods[key] !== ''
        ) {
          updateGoods[key] = goods[key];
        }
      }
    },
  },
  actions: {
    //执行异步操作
    insertCart(ctx, goods) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.token) {
          //已登录
          console.log('已登录 添加购物车~');
        } else {
          //未登录
          ctx.commit('insertCart', goods);
          resolve();
        }
      });
    },
    //获取购物车列表
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          //登录 TODO
        } else {
          const promiseArr = ctx.state.list.map((item) =>
            getNewCartGoods(item.skuId)
          );
          Promise.all(promiseArr)
            .then((dataArr) => {
              dataArr.forEach((data, i) =>
                ctx.commit('updateCart', {
                  skuId: ctx.state.list[i].skuId,
                  ...data.result,
                })
              );
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
  },
};
