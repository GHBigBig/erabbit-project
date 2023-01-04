<script>
export default {
  name: 'ERabbitCallbackLoginPatch',
};
</script>
<script setup></script>
<template>
  <div class="er-form">
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input type="text" class="input" placeholder="请输入用户名" />
      </div>
      <div class="error">用户名错误</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input type="text" class="input" placeholder="请输入手机号" />
      </div>
      <div class="error">手机号错误</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input type="text" class="input" placeholder="请输入短信验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div class="error">验证码错误</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          type="password"
          class="input"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </div>
      <div class="error">密码错误</div>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          type="password"
          class="input"
          autocapitalize="off"
          placeholder="请输入密码"
        />
      </div>
      <div class="error">密码错误</div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </div>
</template>
<style></style>
