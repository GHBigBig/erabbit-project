import request from '@/utils/request';

const findAllCategory = () => {
  return request('/home/category/head', 'get');
};
const findTopCategory = (id) => {
  return request('/category', 'get', { id });
};

/**
 * 获取二级分类筛选条件数据
 * @param {String} id 二级分类 ID
 * @returns
 */
const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id });
};

/**
 * 获取分类下的商品
 * @param {Object} params 查询条件，无必须项，详细参考接口
 * @returns Promise
 */
const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params);
};

export {
  findAllCategory,
  findTopCategory,
  findSubCategoryFilter,
  findSubCategoryGoods,
};
