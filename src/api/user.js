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

/**
 * 使用 QQ 登录
 * @param {String} unionId QQ登录唯一标识
 * @param {Number} source 整数 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */
const userQQLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source });
};

/**
 * QQ绑定界面，发送短信验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile });
};

/**
 * 将QQ和系统账户绑定
 * @param {Object} { unionId: QQ唯一标识, mobile: 手机号, code: 验证码 }
 * @returns Promise
 */
const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code });
};

export {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg,
  userQQLogin,
  userQQBindCode,
  userQQBindLogin,
};
