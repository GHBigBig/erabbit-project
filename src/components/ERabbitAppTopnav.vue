<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const profile = computed(() => {
  return store.state.user.profile;
});

const router = useRouter();

const logout = () => {
  //清空购物车
  store.commit('cart/setCartList', []);
  store.commit('user/setUser', {});
  router.push('/login');
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>
              {{ store.state.user.profile.nickname }}
            </a>
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
        </template>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @erColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
