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
        <ta-button class="ta-login__button" type="primary">
          登录
        </ta-button>
      </ta-form>
      <div class="register">
        <p>没有帐号？</p>
        <ta-button @click="toggleRegisterPanel()">
          立即注册
        </ta-button>
      </div>

      <ta-dialog
        title="用户注册"
        :width="600"
        v-if="showRegisterPanel"
        @ok="registerUser()"
        @cancel="toggleRegisterPanel()">
        <div class="form-group">
          <ta-input 
            :focus="showRegisterPanel" 
            placeholder="用户账户" 
            v-model="newAccount"
            @blur="checkAccountExist()"
            :class="{'is-invalid': accountMessage}">
          </ta-input>
          <transition name="slide-down">
            <p v-if="!!accountMessage">{{ accountMessage }}</p>
          </transition>
        </div>
        <div class="form-group">
          <ta-input 
            type="password"
            placeholder="用户密码" 
            v-model="newPassword"
            @blur="checkPassword"
            :class="{'is-invalid': passwordMessage}">
          </ta-input>
          <transition name="slide-down">
            <p v-if="!!passwordMessage">{{ passwordMessage }}</p>
          </transition>
        </div>
        <div class="form-group">
          <ta-input
            type="password"
            placeholder="请再次输入用户密码" 
            v-model="newPassword2"
            @blur="checkPassword2"
            :class="{'is-invalid': passwordMessage2}">
          </ta-input>
          <transition name="slide-down">
            <p v-if="!!passwordMessage2">{{ passwordMessage2 }}</p>
          </transition>
        </div>
      </ta-dialog>
    </div>
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
  showRegisterPanel = false
  newAccount = ''
  newPassword = ''
  newPassword2 = ''
  accountMessage = ''
  passwordMessage = ''
  passwordMessage2 = ''

  toggleRegisterPanel() {
    this.showRegisterPanel = !this.showRegisterPanel

    if (!this.showRegisterPanel) {
      this.accountMessage = ''
      this.passwordMessage = ''
      this.passwordMessage2 = ''
    }
  }

  async login() {
    const user = {
      account: this.account,
      password: this.password
    }

    try {
      const res = await UserProvider.login(user)
      this.$store.dispatch('login', res.data)
        .then(() => {
          const userInfo = jwtDecode(res.data)
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
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

  async checkAccountExist() {
    if (!this.newAccount) {
      this.accountMessage = '请输入用户账户'
      return false
    }

    try {
      const res = await UserProvider.checkAccountExist(this.newAccount)
      if (res.status === 'no') {
        this.accountMessage = res.message
        return false
      } else {
        this.accountMessage = ''
        return true
      }
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  checkPassword() {
    if (!this.newPassword) {
      this.passwordMessage = '密码不得为空'
      return false
    } else if (this.newPassword.length < 5 || this.newPassword.length > 16) {
      this.passwordMessage = '密码长度应在5到16位'
      return false
    } else {
      this.passwordMessage = ''
      return true
    }
  }

  checkPassword2() {
    if (this.newPassword !== this.newPassword2) {
      this.passwordMessage2 = '两次密码不一致'
      return false
    } else {
      this.passwordMessage2 = ''
      return true
    }
  }

  async registerUser() {
    let flag = this.checkAccountExist()
    flag && (flag = this.checkPassword())
    flag && (flag = this.checkPassword2())
    
    if (!flag) {
      return
    } else {
      try {
        await UserProvider.register({
          account: this.newAccount,
          password: this.newPassword
        })

        this.$message.success('注册成功，请登录')
        this.toggleRegisterPanel()
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
