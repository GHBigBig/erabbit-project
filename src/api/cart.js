import request from '@/utils/request';

const getNewCartGoods = (skuId) => request(`/goods/stock/${skuId}`, 'get');

/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 * @return Promise
 */
const mergeLocalCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList);
};

export { getNewCartGoods, mergeLocalCart };
