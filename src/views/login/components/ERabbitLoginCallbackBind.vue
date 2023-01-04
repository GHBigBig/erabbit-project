<template>
  <div class="er-form">
    <div class="user-info">
      <img
        src="http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50"
        alt="用户头像"
      />
      <p>Hi，Tom 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="er-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input type="text" class="input" placeholder="请输入要绑定的手机号" />
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
    <a href="javascript:;" class="submit">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  padding: 0 10px;
  margin: 0 auto;
  margin-bottom: 25px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    background-color: #f2f2f2;
  }
  p {
    padding-left: 10px;
  }
}
</style>
