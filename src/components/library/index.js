import ERabbitSkeleton from './ERabbitSkeleton.vue';
import ERabiitCarousel from './ERabiitCarousel.vue';
import ERabbitMore from './ERabbitMore.vue';

import defaultImg from '@/assets/images/200.png';

export default {
  install(app) {
    //app 应用实例
    app.component('ERabbitSkeleton', ERabbitSkeleton);
    app.component('ERabiitCarousel', ERabiitCarousel);
    app.component('ERabbitMore', ERabbitMore);

    app.directive('lazyload', (el, binding) => {
      //在指令生命周期 mounted 和 update 触发
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          console.log('img img img');
          if (isIntersecting) {
            observer.unobserve(el);
            el.onerror = () => {
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0.01,
        }
      );
      observer.observe(el);
    });
  },
};
