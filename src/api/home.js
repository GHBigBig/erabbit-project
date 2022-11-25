import request from '@/utils/request';

const findBrand = (limit) => request('/home/brand', 'get', { limit });
const findBanner = () => request('/home/banner', 'get');
const findNew = () => request('/home/new', 'get');
const findHot = () => request('/home/hot', 'get');
const findGoods = () => request('/home/goods', 'get');
const findSpecial = () => request('/home/special', 'get');

export { findBrand, findBanner, findNew, findHot, findGoods, findSpecial };
