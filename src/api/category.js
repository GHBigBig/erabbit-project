import request from '@/utils/request';

const findAllCategory = () => {
  return request('/home/category/head', 'get');
};
const findTopCategory = (id) => {
  return request('/category', 'get', { id });
};

export { findAllCategory, findTopCategory };
