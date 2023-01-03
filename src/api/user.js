import request from '@/utils/request';

/**
 * 账户登录
 * @param {Object} {account: 账户, password: '密码'}
 * @returns Promise
 */
const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password });
};

export { userAccountLogin };
