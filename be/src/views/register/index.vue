<template>
  <div class="ta-register">
    <!-- <div class="ta-register__head">
      <div class="ta-logo">
        <span>Elapse Admin</span>
      </div> -->
    <!-- </div> -->
    <div class="ta-register__form-container">
      <div class="panel">
        <h2>
          <ta-icon name="person-add"></ta-icon>
          <span>注册用户</span>
        </h2>
        <ta-form class="ta-register__form" :rules="rules" @submit="register">
          <ta-form-item
            :validator="checkAccountExist"
            prop="account"
            placeholder="请输入帐号" v-model="account" :rules="rules.account">
          </ta-form-item>
          <ta-form-item
            prop="password"
            placeholder="请输入密码" type="password" 
            v-model="passwd" :rules="rules.passwd">
          </ta-form-item>
          <ta-form-item
            prop="passwordConfirm"
            :validator="checkSamePasswd"
            placeholder="请再次输入密码" type="password" 
            v-model="passwdConfirm" :rules="rules.passwd">
          </ta-form-item>
          <ta-button class="ta-register__button" type="primary">
            注册
          </ta-button>
        </ta-form>
      </div>
      <div class="other">
        <span>已有帐号</span>
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { UserProvider } from '@/provider/user-provider'

@Component({
})
export default class Register extends Vue {
  account = ''
  passwd = ''
  passwdConfirm = ''
  rules = {
    account:[
      { required: true, message: '账号不得为空', trigger: 'blur' },
    ],
    passwd: [
      { required: true, message: '密码不得为空', trigger: 'blur' },
      { min: 5, max: 16, message: '密码长度应在5到16之间', trigger: 'blur' }
    ],
  }

  checkSamePasswd() {
    if (this.passwd !== this.passwdConfirm) {
      return new Error('两次输入密码不一致')
    } else {
      return ''
    }
  }

  async checkAccountExist() {
    return UserProvider.checkAccountExist(this.account)
      .then(res => {
        if (res.code === 'no') {
          return new Error(res.message)
        } else {
          return ''
        }
      })
      .catch(err => err)  
  }

  async register() {
    UserProvider.checkAccountExist(this.account)
      .then(async () => {
        return UserProvider.register({
          account: this.account,
          passwd: this.passwd
        })
      })
      .then(() => {
        this.account = ''
        this.passwd = ''
        this.passwdConfirm = ''
        return this.$confirm('您已注册成功，是否前往登录页', '提示')
      })
      .then(() => this.login())
      .catch(err => {
        const msg = err.message
        if (msg) {
          this.$message.error(msg)
        }
      })
  }

  login() {
    this.$router.replace('/login')
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
