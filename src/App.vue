<script setup>
</script>

<template>
  <h1>小兔儿鲜</h1>
  <div>
    App {{ $store.state.user.profile.account }}
    <button @click="$store.commit('user/setUser', { account: 'zhousg' })">
      设置用户信息
    </button>
  </div>
</template>
