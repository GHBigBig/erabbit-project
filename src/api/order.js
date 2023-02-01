import request from '@/utils/request';

/**
 * 获取结算信息
 * @returns Promise
 */
const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get');
};

export { findCheckoutInfo };
