//购物车
// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息
export default {
  namespaced: true,
  state: () => {
    return {
      list: [],
    };
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
  },
  actions: {
    //执行异步操作
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
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
  },
};
