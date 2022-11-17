import { createStore } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';

import user from './modules/user';
import cart from './modules/cart';
import cartgory from './modules/cartgory';

export default createStore({
  modules: {
    user,
    cart,
    cartgory,
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-project',
      paths: ['user', 'cart'],
    }),
  ],
});
