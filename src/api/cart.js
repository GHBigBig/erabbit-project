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

/**
 * 删除 数组 ids 对应的商品
 * @param {Array<String>} ids skuId 集合
 * @returns Promise
 */
const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids });
};

/**
 * 修改购物车商品的状态和数据量
 * @param {Object} goods 商品
 * @param {String} goods.skuId 商品 skuId
 * @param {Boolean} goods.selected 选中状态
 * @param {Integer} goods.count 商品数量
 * @returns Promise
 */
const updateCart = (goods) => {
  return request(`/member/cart/${goods.skuId}`, 'put', goods);
};

/**
 * 全选反选
 * @param {Object} param0
 * @param {Boolean} param0.selected 选中状态
 * @param {Array<String>} param0.ids 有效商品 skuId 集合
 * @returns Promise
 */
const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids });
};

export {
  getNewCartGoods,
  mergeLocalCart,
  findCartList,
  insertCart,
  deleteCart,
  updateCart,
  checkAllCart,
};
