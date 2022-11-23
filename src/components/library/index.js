import ERabbitSkeleton from './ERabbitSkeleton.vue';
import ERabiitCarousel from './ERabiitCarousel.vue';

export default {
  install(app) {
    //app 应用实例
    app.component('ERabbitSkeleton', ERabbitSkeleton);
    app.component('ERabiitCarousel', ERabiitCarousel);
  },
};
