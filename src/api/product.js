import request from '@/utils/request';

const findGoods = (id) => request('/goods', 'get', { id });

export { findGoods };
