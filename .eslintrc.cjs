/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    //eslint-plugin-prettier插件会调用prettier对代码风格进行检查
    //通过使用eslint-config-prettier配置，能够关闭与prettier冲突的lint选项。这样我们就不会看到一些error同时出现两次。使用的时候需要确保，这个配置在extends的最后一项
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  // rules: {
  //   'prettier/prettier': [
  //     'warn',
  //     {
  //       singleQuote: true,
  //       tabWidth: 2,
  //     },
  //   ],
  // },
};
