import request from '@/utils/request';

const findBrand = (limit) => request('/home/brand', 'get', { limit });
const findBanner = () => request('/home/banner', 'get');
export { findBrand, findBanner };
