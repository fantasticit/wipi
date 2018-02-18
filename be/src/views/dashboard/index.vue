<template>
  <div class="ta-page">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="ta-page__statics is-success">
            <div class="col-3 icon-message">
              <ta-icon name="person-stalker"></ta-icon>
            </div>
            <div class="col-9 info">
              <p>{{ apiCallTimes }}</p>
              <p>用户注册数</p>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="ta-page__statics is-primary">
            <div class="col-3 icon-message">
              <ta-icon name="ios-paper"></ta-icon>
            </div>
            <div class="col-9 info">
              <p>{{ statics.pv }}</p>
              <p>页面浏览量</p>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="ta-page__statics is-danger">
            <div class="col-3 icon-message">
              <ta-icon name="shuffle"></ta-icon>
            </div>
            <div class="col-9 info">
              <p>{{ apiCallTimes }}</p>
              <p>接口调用量</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="ta-page__userInfo">
          <div class="row head">
            <div class="col-3">
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
      </div>
    </div>
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
