import request from '@/utils/request';

/**
 * 有 ID 获取推荐商品，无 ID 获取猜你喜欢
 * @param {String, Number} id
 * @param {Number} limit
 * @returns Promise
 */
const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit });
};

/**
 *
 * @param {Number, String} id 商品id
 * @param {Number} type 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit 限制个数
 * @returns Promise
 */
const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit });
};

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品 ID
 * @returns
 */
const findCommentInfoByGoods = (id) => {
  return request(`/goods/${id}/evaluate`, 'get');
};

/**
 * 查询商品评价列表
 * @param {String} id 商品 ID
 * @param {Object} reqParams 查询条件
 * @returns Promise
 */
const findCommentListByGoods = async (id, reqParams) => {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    'get',
    reqParams
  );
};

/**
 * 根据 skuId 获取商品的 specs 和 skus
 * @param {String} skuId 商品的 SKUID
 * @returns Promise
 */
const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get');
};

export {
  findRelGoods,
  findHotGoods,
  findCommentInfoByGoods,
  findCommentListByGoods,
  getSpecsAndSkus,
};
