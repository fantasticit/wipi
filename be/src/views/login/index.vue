<template>
  <div class="ta-login">
    <div class="ta-login__container">
      <ta-form class="ta-login__form" :rules="rules" @submit="login()">
        <h1>系统登录</h1>
        <ta-form-item
          prop="account"
          placeholder="请输入帐号" v-model="account" :rules="rules.account">
        </ta-form-item>
        <ta-form-item
          prop="password"
          placeholder="请输入密码" type="password" 
          v-model="password" :rules="rules.password">
        </ta-form-item>
        <ta-button class="btn-login">
          登录
        </ta-button>
      </ta-form>
      <!-- <div class="register">
        <span>没有帐号？</span>
        <router-link to="/register">立即注册</router-link>
      </div> -->
    </div>

    <ul class="ta-bubbles">
      <li v-for="(i, j) in Array(10)" :key="i"></li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { UserProvider } from '@/provider/user-provider'

const jwtDecode = require('jwt-decode')

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
      passwd: this.password
    }

    try {
      const res = await UserProvider.login(user)
      this.$store.dispatch('login', res.data)
        .then(() => {
          const userInfo = jwtDecode(res.data)
          this.$store.dispatch('setUserInfo', userInfo)
          this.$notify.success('欢迎登录', this.account)
          const redirect = this.$route.query && this.$route.query.redirect || ''
          if (!!redirect) {
            this.$router.replace(redirect)
          } else {
            this.$router.replace('/dashboard')
          }
        })
    } catch (err) {
      this.$message.error(err.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
