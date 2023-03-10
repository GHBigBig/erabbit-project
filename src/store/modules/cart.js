//购物车
// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective

import {
  getNewCartGoods,
  mergeLocalCart,
  findCartList,
  insertCart,
  deleteCart,
  updateCart,
  checkAllCart,
} from '@/api/cart';

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
    //设置购物车列表
    setCartList(state, list) {
      state.list = list;
    },
  },
  actions: {
    //执行异步操作
    insertCart(ctx, goods) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //已登录 console.log('已登录 添加购物车~');
          insertCart(goods)
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit('setCartList', data.result);
              resolve;
            });
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
          findCartList().then((data) => {
            ctx.commit('setCartList', data.result);
            resolve();
          });
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
          deleteCart([skuId])
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit('setCartList', data.result);
              resolve();
            });
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
          updateCart(goods)
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit('setCartList', data.result);
              resolve();
            });
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
          const ids = ctx.getters.validList.map((item) => item.skuId);
          checkAllCart({ selected, ids })
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit('setCartList', data.result);
              resolve();
            });
        } else {
          ctx.getters.validList.forEach((item) => {
            ctx.commit('updateCart', { skuId: item.skuId, selected });
          });
          resolve();
        }
      });
    },
    //批量删除选中商品或者清空无效商品
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //登录 TODO
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(
            (item) => item.skuId
          );
          deleteCart(ids)
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit('setCartList', data.result);
              resolve();
            });
        } else {
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(
            (item) => {
              ctx.commit('deleteCart', item.skuId);
            }
          );
          resolve();
        }
      });
    },
    //修改 sku 规格参数
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve) => {
        if (ctx.rootState.user.profile.token) {
          //登录 TODO
          //没有修改规格的接口，通过删旧商品，插入新商品
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          );
          deleteCart([oldSkuId])
            .then(() => {
              return insertCart({ skuId: newSku.skuId, count: oldGoods.count });
            })
            .then(() => {
              return findCartList();
            })
            .then((data) => {
              ctx.commit('setCartList', data.result);
              resolve();
            });
        } else {
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          );
          ctx.commit('deleteCart', oldSkuId);
          const {
            skuId,
            price: nowPrice,
            inventory: stock,
            specsText: attrsText,
          } = newSku;
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText };
          ctx.commit('insertCart', newGoods);
          resolve();
        }
      });
    },
    //合并本地购物车
    async mergeLocalCart(ctx) {
      //存储 token 后调用合并 API 接口函数进行购物合并
      const cartList = ctx.getters.validList.map(
        ({ skuId, selected, count }) => {
          return { skuId, selected, count };
        }
      );
      await mergeLocalCart(cartList);
      //合并成功将本地购物车删除
      ctx.commit('setCartList', []);
    },
  },
};
