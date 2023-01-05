export default {
  namespaced: true,
  state() {
    return {
      profile: {
        id: '',
        account: '',
        avatar: '',
        nickname: '',
        mobile: '',
        token: '',
      },
      redirectUrl: '/',
    };
  },
  mutations: {
    setUser(state, payload) {
      state.profile = payload;
    },
    setRedirectUrl(state, url) {
      state.redirectUrl = url;
    },
  },
};
