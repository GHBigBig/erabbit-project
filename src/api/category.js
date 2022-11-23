import request from '@/utils/request';

const findAllCategory = () => {
  return request('/home/category/head', 'get');
};

export { findAllCategory };
