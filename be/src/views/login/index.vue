<template>
  <div class="fa-login">
    <div class="fa-login__form">
      <h1>系统登录</h1>
      <fa-form-item 
        placeholder="请输入帐号" v-model="account" :rules="accountRules"
        @success="successPassed(0)" @fail="failPassed(0)">
      </fa-form-item>
      <fa-form-item 
        placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules"
        @success="successPassed(1)" @fail="failPassed(1)">
      </fa-form-item>
      <fa-button class="fa-login__button" type="primary" @click="login()">登录</fa-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { UserProvider } from '@/provider/user-provider'

@Component({
})
export default class Login extends Vue {
  account = ''
  password = ''
  accountRules = [
    { required: true, message: '账号不得为空', trigger: 'blur' },
  ]
  passwordRules = [
    { required: true, message: '密码不得为空', trigger: 'blur' },
    { min: 5, max: 16, message: '密码长度应在5到16之间', trigger: 'blur' }
  ]
  passed = [false, false]

  successPassed(i) {
    this.$set(this.passed, i, !0)
  }

  failPassed(i) {
    this.$set(this.passed, i, !1)
  }

  async login() {
    if (this.passed.every(pass => pass)) {
      const user = {
        account: this.account,
        password: this.password
      }

      try {
        const res = await UserProvider.login(user)
        this.$message.success(`欢迎您, ${this.account}`)
        this.$router.replace('/dashboard')
      } catch (err) {
        this.$message.error(err.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
