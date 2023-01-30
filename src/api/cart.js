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

/**
 * 获取购物车的商品列表
 * @returns Promise
 */
const findCartList = () => {
  return request('/member/cart', 'get');
};

/**
 * 加入购物车
 * @param {String} skuId 商品 SKUID
 * @param {Number} count 商品数量
 * @returns Promise
 */
const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count });
};

export { getNewCartGoods, mergeLocalCart, findCartList, insertCart };
