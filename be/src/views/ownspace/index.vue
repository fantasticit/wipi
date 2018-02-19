<template>
  <div class="ta-page">
    <div class="ta-page__info">
      <div class="head">
        <ta-icon name="person"></ta-icon>
        <span>个人信息</span>
      </div>
      <div class="body">
        <!-- 用户账户 -->
        <div class="ta-page__info-item">
          <label>用户账户：</label>
          <template v-if="!showModifyAccount">
            <span>{{ account }}</span>
            <ta-button @click="showModifyAccount = true">修改</ta-button>
          </template>
          <template v-else>
            <ta-input  :focus="showModifyAccount" v-model="account"></ta-input>
            <ta-button :loading="accountModifying" @click="modifyAccount()">保存</ta-button>
            <ta-button @click="showModifyAccount = false">取消</ta-button>
          </template>
        </div>
        
        <!-- 用户头像 -->
        <div class="ta-page__info-item">
          <label>用户头像：</label>
          <ta-upload :cover="userInfo.avatar" @success="getAvatar($event)"></ta-upload>
        </div>

        <!-- 修改密码 -->
        <div class="ta-page__info-item">
          <label>登录密码：</label>
          <ta-button v-if="!showForm" @click="showForm = true">修改密码</ta-button>
          <div v-else class="ta-page__form-container">
            <ta-form class="ta-page__form" :rules="rules" @submit="updatePwd">
              <ta-form-item
                prop="account"
                type="password"
                placeholder="请输入原密码" v-model="oldPasswd" :rules="rules.passwd">
              </ta-form-item>
              <ta-form-item
                prop="password"
                placeholder="请输入密码" type="password" 
                v-model="newPasswd" :rules="rules.passwd">
              </ta-form-item>
              <ta-form-item
                prop="passwordConfirm"
                :validator="checkSamePasswd"
                placeholder="请再次输入密码" type="password" 
                v-model="newPasswdConfirm" :rules="rules.passwd">
              </ta-form-item>
              
              <div>
                <ta-button size="small" :loading="loading" type="primary">确认</ta-button>
              </div>
            </ta-form>
            <ta-button class="btn-cancel" size="small" @click="closeDialog">取消</ta-button>
          </div>
        </div>
        
        <!-- 用户角色 -->
        <div class="ta-page__info-item">
          <label>用户角色：</label>
          <span>{{ userInfo.roles.join('、') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import { UserProvider } from '@/provider/user-provider'

@Component({
  computed: {
    ...mapState({
      coverPrefix: state => state.article.coverPrefix,
      userInfo: state => state.userInfo,
    })
  }
})
export default class Ownspace extends Vue {
  userId = ''
  account = ''
  // 修改账户
  showModifyAccount = false
  accountModifying = false
  // 修改头像
  uploadToken = ''
  // 修改密码
  loading = false
  showForm = false
  oldPasswd = ''
  newPasswd = ''
  newPasswdConfirm = ''

  rules = {
    passwd: [
      { required: true, message: '密码不得为空', trigger: 'blur' },
      { min: 5, max: 16, message: '密码长度应在5到16之间', trigger: 'blur' }
    ],
  }

  created() {
    this.userId = this.userInfo.id
    this.account = this.userInfo.account
  }

  checkSamePasswd() {
    if (this.newPasswd !== this.newPasswdConfirm) {
      return new Error('两次输入密码不一致')
    } else {
      return ''
    }
  }

  // 修改账户
  async modifyAccount() {
    this.accountModifying = true
    try {
      await UserProvider.update(this.userId, {
        account: this.account,
        action: 'modifyAccount'
      })
      this.showModifyAccount = false
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.accountModifying = false
    }
  }

  // 上传新头像
  getAvatar(hash) {
    this.avatar = this.coverPrefix + hash
  }

  // 修改头像
  async modifyAvatar(avatar) {
    try {
      await UserProvider.update(this.userId, {
        avatar,
        action: 'modifyAvatar'
      })
      this.$notify.success('头像已更新')
    } catch (err) {
      this.$message.error(err.message)
    }
  }


  // 关闭弹窗
  closeDialog() {
    this.showForm = false
    this.oldPasswd = ''
    this.newPasswd = ''
    this.newPasswdConfirm = ''
  }

  // 更新密码
  async updatePwd() {
    this.loading = true
    try {
      await UserProvider.update(this.userId, {
        oldPasswd: this.oldPasswd,
        newPasswd: this.newPasswd,
        action: 'modifyPasswd'
      })
      this.$notify.success('密码修改成功，请重新登录')
      this.$store.dispatch('logout')
        .then(() => this.$router.replace('/login'))
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.loading = false
    }    
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

