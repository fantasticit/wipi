<template>
  <div class="ta-login">
    <ta-form class="ta-login__form" :rules="rules" @submit="login()">
      <h1>系统登录</h1>
      <ta-form-item 
        prop="account"
        placeholder="请输入帐号" v-model="account" :rules="rules.account"
      >
      </ta-form-item>
      <ta-form-item
        prop="password"
        placeholder="请输入密码" type="password" 
        v-model="password" :rules="rules.password"
      >
      </ta-form-item>
      <ta-button class="ta-login__button" type="primary">登录</ta-button>
    </ta-form>
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
  rules = {
    account:[
      { required: true, message: '账号不得为空', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '密码不得为空', trigger: 'blur' },
      { min: 5, max: 16, message: '密码长度应在5到16之间', trigger: 'blur' }
    ]
  }

  async login() {
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
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
