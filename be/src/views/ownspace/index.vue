<template>
  <div class="ta-page">
    <div class="ta-page__info">
      <div class="head">
        <ta-icon name="person"></ta-icon>
        <span>个人信息</span>
      </div>
      <div class="body">
        <div>
          <label>用户账户</label>
          <ta-input v-model="account"></ta-input>
        </div>
        <div>
          <label>用户角色</label>
          <span>{{ roles.join('、') }}</span>
        </div>
        <div>
          <label>用户头像</label>
          <ta-upload :image="avatar" @success="getAvatar($event)">
          </ta-upload>
        </div>
        <div>
          <label>登录密码</label>
          <ta-button type="text" @click="updatePwd()">修改密码</ta-button>
        </div>
        <div class="button-group">
          <ta-button size="small" @click="cancel()">取消</ta-button>
          <ta-button 
            size="small" :loading="loading" type="primary"
            @click="updateInfo()">
            保存
          </ta-button>
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
    ...mapState('article', {
      coverPrefix: state => state.coverPrefix,
    })
  }
})
export default class Ownspace extends Vue {
  userId = ''
  account = ''
  roles = []
  loading = false
  password = ''
  avatar = ''

  oldAccount = ''
  oldPassword = ''
  oldAvatar = ''

  created() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.userId = userInfo.id
    this.account = userInfo.account
    this.avatar = userInfo.avatar
    this.roles = userInfo.roles
    this.password = userInfo.password

    this.oldAccount = this.account
    this.oldPassword = this.password
    this.oldAvatar = this.avatar
  }

  cancel() {
    this.$router.go(-1)
  }

  // 获取上传后的封面路径
  getAvatar(res) {
    this.avatar = this.coverPrefix + res.hash
  }

  updatePwd() {
    this.$prompt('请输入新密码', '修改密码', {
      rules: [
        { required: true, message: '密码不得为空', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度应在5到16之间', trigger: 'blur' }
      ]
    })
      .then(async ({ value }) => {
        this.password = value
      })
      .catch(err => this.$message.info('取消修改'))
  }

  async updateInfo() {
    if (
      this.account === this.oldAccount
      && this.password === this.oldPassword
      && this.avatar === this.oldAvatar
    ) {
      this.$message.info('未作任何修改')
      return
    }

    this.loading = true
    
    try {
      const res = await UserProvider.update(this.userId, {
        account: this.account,
        password: this.password,
        avatar: this.avatar,
      })

      this.$message.success(res)
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.replace({
            path: '/login',
            query: { redirect: this.$router.currentRoute.fullPath }
          })
        })
    } catch (err) {
      this.$message.error(err.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@include b(page) {
  @include e(info) {
    flex: 1;
    background: #fff;
    border: 1px solid $border;
    border-radius: 5px;
    margin-left: 15px;
    
    .head {
      padding: 15px;
      border-bottom: 1px solid $border;
      @include flexLayout(flex-start) {
        align-items: center;
      };

      > .ta-icon {
        margin-right: 6px;

        &::before {
          transform: translateY(0px);
        }
      }
    
      > .ta-select {
        flex: 1;
      }
    }

    .body {
      padding: 25px;

      > div {
        @include flexLayout(flex-start);

        + div {
          margin-top: 1em;
        }

        &:nth-of-type(3)  {
          > label {
            @include flexLayout() {
              align-items: center;
            };
          }

          > button {
            padding-left: 0;
            padding-right: 0;
          }
        }

        /deep/ .ta-upload {
          width: 217px; 
        }
      }

      label {
        margin-right: 1em;
      }

      .button-group {
        padding-left: 5em;
      }
    }
  }
}
</style>

