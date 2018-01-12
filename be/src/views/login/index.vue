<template>
  <div class="fa-login">
    <div class="fa-login__form">
      <fa-form-item
        placeholder="请输入帐号"
        invalidTip="帐号不得为空"
        v-model="account"
        :required="true"
        trigger="blur">
      </fa-form-item>
      <fa-form-item
        placeholder="请输入密码"
        invalidTip="密码不得为空"
        type="password"
        :required="true"
        trigger="blur"
        v-model="password">
      </fa-form-item>
      <el-button>登录</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
})
export default class Login extends Vue {
  account = ''
  password = ''

  logAccount(account) {
    console.log(account)
  }
}
</script>

<style lang="scss" scoped>
@include b(login) {
  position: fixed;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  align-items: center;
  @include flexLayout();

  @include e(form) {
    width: 300px;
    padding: 15px 30px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
