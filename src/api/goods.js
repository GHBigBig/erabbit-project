import request from '@/utils/request';

const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit });
};

export { findRelGoods };
