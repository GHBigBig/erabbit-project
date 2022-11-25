import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

/**
 *
 * @param {Function} apiFn 数据加载函数，要求返回 promise
 * @returns "{ target, result }
 */
const useLazyData = (apiFn) => {
  const target = ref(null);
  const result = ref(null);
  //内部的this就是定义时上层作用域中的this。
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop();
        apiFn().then((data) => {
          result.value = data.result;
        });
      }
    },
    {
      //容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，
      threshold: 0,
    }
  );
  return { target, result };
};

export { useLazyData };
