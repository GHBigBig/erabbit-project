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
    validList(state) {
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    //派生的有效的商品件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0);
    },
    //有效的商品总金额
    validAmount(state, getters) {
      return (
        getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) /
        100
      );
    },
    //无效商品列表
    invalidList(state) {
      return state.list.filter((item) => !(item.stock > 0 && item.isEffective));
    },
    //选中的商品列表
    selectedList(state, getters) {
      return getters.validList.filter((item) => item.selected);
    },
    //选中的商品总件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => {
        p + c.count;
      }, 0);
    },
    //选中的商品总金额
    selectedAmount(state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + c.nowPrice * 100 * c.count,
          0
        ) / 100
      );
    },
    // 是否全选
    isCheckAll(state, getters) {
      const result =
        getters.selectedList.length > 0 &&
        getters.validList.length === getters.selectedList.length;
      return result;
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
        // 删除goods
        state.list.splice(sameIndex, 1);
        console.log(state.list);
      }
      state.list.unshift(goods);
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
    //删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId == skuId);
      state.list.splice(index, 1);
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
    //删除购物车商品
    deleteCart(ctx, skuId) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //登录TODO
        } else {
          ctx.commit('deleteCart', skuId);
          resolve();
        }
      });
    },
    //修改购物车信息
    updateCart(ctx, goods) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //登录 TODO
        } else {
          //本地修改
          ctx.commit('updateCart', goods);
          resolve();
        }
      });
    },
    checkAllCart(ctx, selected) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //登录 TODO
        } else {
          ctx.getters.validList.forEach((item) => {
            ctx.commit('updateCart', { skuId: item.skuId, selected });
          });
          resolve();
        }
      });
    },
    //批量删除选中商品
    batchDeleteCart(ctx) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //登录 TODO
        } else {
          ctx.getters.selectedList.forEach((item) => {
            ctx.commit('deleteCart', item.skuId);
          });
          resolve();
        }
      });
    },
  },
};
