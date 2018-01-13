<template>
  <div class="fa-login">
    <div class="fa-login__form">
      <h1>系统登录</h1>
      <fa-form-item 
        placeholder="请输入帐号" v-model="account" :rules="accountRules"
        @success="pass(0)">
      </fa-form-item>
      <fa-form-item 
        placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules"
        @success="pass(1)">
      </fa-form-item>
      <fa-button class="fa-login__button" type="primary" @click="login()">登录</fa-button>
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
  accountRules = [
    { required: true, message: '账号不得为空', trigger: 'blur' },
    { min: 3, max: 10, message: '账号长度应在3到10之间', trigger: 'blur' }
  ]
  passwordRules = [
    { required: true, message: '密码不得为空', trigger: 'blur' },
  ]
  passed = [false, false]

  pass(i) {
    this.$set(this.passed, i, true)
  }

  login() {
    if (this.passed.every(pass => pass)) {
      this.$message.success('ok')
    } else {
      this.$message.error('请完善信息')
    }
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
  background-color: #2d3a4b;

  align-items: center;
  flex-direction: column;
  @include flexLayout(flex-start);

  @include e(form) {
    width: 360px;
    padding: 15px 30px;
    text-align: center;
    margin: 180px auto;

    h1 {
      font-size: 26px;
      color: #fff;
      margin-bottom: 40px;
    }
  }

  @include e(button) {
    width: 100%;
  }
}
</style>
