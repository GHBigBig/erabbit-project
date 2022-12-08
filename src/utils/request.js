import axios from 'axios';
import store from '../store';
import router from '../router';

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/';
const instance = axios.create({
  baseURL,
  timeout: 10000,
});

//请求拦截器，如果有token进行头部携带
instance.interceptors.request.use(
  (config) => {
    const { profile } = store.state.user;
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器：1. 剥离无效数据  2. 处理token失效
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status === 401) {
      store.commit('user/setUser', {});
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      router.push(`/login?redirectUrl=${fullPath}`);
    }
    return Promise.reject(err);
  }
);

export { baseURL };
// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  });
};
