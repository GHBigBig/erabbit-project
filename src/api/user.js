import request from '@/utils/request';

/**
 * 账户登录
 * @param {Object} {account: 账户, password: '密码'}
 * @returns Promise
 */
const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password });
};

/**
 * 手机号短信登录
 * @param {Object} { mobile: 手机号, code: 验证码 }
 * @returns Promise
 */
const userMobileLogin = ({ mobile, code }) => {
  return request('/login/login', 'post', { mobile, code });
};

/**
 * 获取短信登录验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile });
};

export { userAccountLogin, userMobileLogin, userMobileLoginMsg };
