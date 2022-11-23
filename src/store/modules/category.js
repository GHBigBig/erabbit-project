import { topCategory } from '@/api/constants';
import { findAllCategory } from '@/api/category';

export default {
  namespaced: true,
  state() {
    return {
      //分类信息
      list: topCategory.map((item) => ({ name: item })),
    };
  },
  mutations: {
    setCategory(state, headCategory) {
      state.list = headCategory;
    },
    show(state, item) {
      //显示 item 的二级分类
      const category = state.list.find((category) => category.id === item.id);
      category.open = true;
    },
    hide(state, item) {
      //隐藏 item 的二级分类
      const category = state.list.find((category) => category.id === item.id);
      category.open = false;
    },
  },
  actions: {
    async getCategory({ commit }) {
      const { result } = await findAllCategory();
      result.forEach((item) => {
        item.open = false; //给一级分类增加一个控制二级分类显示隐藏的字段 open
      });
      commit('setCategory', result);
    },
  },
};
