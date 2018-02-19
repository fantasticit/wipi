<template>
  <div class="ta-page">
    <ta-row>
      <!-- 用户登录信息 -->
      <ta-col :span="4" :sm="12">
        <div class="ta-page__userInfo">
          <div class="head">
            <div>
              <img :src="userInfo.avatar" alt="avatar" class="avatar">
            </div>
            <div class="col-9">
              <div>
                <p class="account">{{ userInfo.account }}</p>
                <p>{{ userInfo.roles.join('、') }}</p>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>
              <span>上次登录时间：</span>
              <span>{{ userInfo.lastLoginTime }}</span>
            </p>
          </div>
        </div>
      </ta-col>

      <ta-col :span="8" :sm="12">
          <ta-col :span="3" class="ta-page__statics" v-for="(info, i) in infos" :key="i">
            <div :class="'is-'+ info['type']">
              <div class="icon">
                <ta-icon :name="info['icon']"></ta-icon>
              </div>
              <div class="info">
                <p>{{ statics.pv }}</p>
                <p>{{ info['title'] }}</p>
              </div>
            </div>
          </ta-col>
      </ta-col>
    </ta-row>  
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatTime } from '@/util/format-time'
import { ReportProvider } from '@/provider/report-provider'

@Component({
})
export default class Dashboard extends Vue {
  statics = {}
  apiCallTimes = 0
  userInfo = {}     
  infos = [
    {
      icon: 'person-stalker',
      title: '用户注册数',
      value: 'pv',
      type: 'success'
    },

    {
      icon: 'ios-paper',
      title: '页面浏览量',
      value: 'pv',
      type: 'primary'
    },

    {
      icon: 'shuffle',
      title: '接口调用量',
      value: 'pv',
      type: 'danger'
    },

    {
      icon: 'shuffle',
      title: '接口调用量',
      value: 'pv',
      type: 'warning'
    },
  ]

  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.userInfo.lastLoginTime = formatTime(this.userInfo.lastLoginTime)
    this.fetchPerformenceStatics()
    this.fetchApiCallTimes()
  }

  async fetchPerformenceStatics() {
    try {
      const res =  await ReportProvider.getStatics()
      this.$set(this.statics, 'pv', res.pv)
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  async fetchApiCallTimes() {
    try { 
      const res = await ReportProvider.getApiCallTimes()
      this.apiCallTimes = Object.keys(res).reduce((num, key) => num += res[key], 0)
    } catch (err) {
      this.$message.error(err.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
