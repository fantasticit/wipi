<template>
  <div class="ta-page">
    <ta-row>
      <!-- 用户登录信息 -->
      <ta-col :span="6" :sm="12">
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
              <span>{{ userInfo.lastLoginAt }}</span>
            </p>
            <p>
              <span>您的注册日期：</span>
              <span>{{ userInfo.createAt }}</span>
            </p>
          </div>
        </div>
      </ta-col>

      <ta-col :span="6" :sm="12">
        <div class="ta-page__chart">
          <div class="head">
            <ta-icon name="ios-paper"></ta-icon>
            最近发布文章
          </div>
          <div class="body">
            <ta-collapse v-for="(article, i) in recentArticles" :key="i">
              <div slot="title">{{ article.title }}</div>
              <div>{{ article.desc }}</div>
            </ta-collapse>
          </div>
        </div>
      </ta-col>

      <ta-col :span="3" :sm="12">
      </ta-col>
    </ta-row>  
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatTime } from '@/util/format-time'
import { ArticleProvider } from '@/provider/article-provider'

const echarts = require('echarts')

@Component({
   watch: {
    staticChartOpt() {
      this.renderStaticChart()
    },
  },
})
export default class Dashboard extends Vue {
  userInfo = {}     
  recentArticles = []

  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.userInfo.lastLoginAt = formatTime(this.userInfo.lastLoginAt)
    this.userInfo.createAt = formatTime(this.userInfo.createAt)

    this.fetchRecentArticles()
  }

  async fetchRecentArticles() {
    this.$loading.start()
    
    try {
      const res = await ArticleProvider.fetchRecentPublishedArticle()
      this.recentArticles = res
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
