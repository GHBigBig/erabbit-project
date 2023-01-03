export default {
  namespaced: true,
  state() {
    return {
      profile: {
        id: '',
        account: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: '',
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      state.profile = payload;
    },
  },
};
