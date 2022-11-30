const modules = import.meta.glob('./*.vue'); //从文件系统导入多个模块

import defaultImg from '@/assets/images/200.png';

export default {
  install(app) {
    //app 应用实例
    for (const path in modules) {
      modules[path]().then((mod) => {
        app.component(mod.default.name, mod.default);
      });
    }

    app.directive('lazyload', (el, binding) => {
      //在指令生命周期 mounted 和 update 触发
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
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
