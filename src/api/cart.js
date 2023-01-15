import request from '@/utils/request';

const getNewCartGoods = (skuId) => request(`/goods/stock/${skuId}`, 'get');

export { getNewCartGoods };
