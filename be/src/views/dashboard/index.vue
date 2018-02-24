<template>
  <div class="ta-page">
    <ta-row>
      <!-- 用户登录信息 -->
      <ta-col :span="3" :sm="12">
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
            <p>
              <span>您的注册日期：</span>
              <span>{{ userInfo.createdTime }}</span>
            </p>
          </div>
        </div>
      </ta-col>

      <ta-col :span="6" :sm="12">
        <div class="ta-page__chart">
          <div class="head">接口数目统计</div>
          <div class="body" ref="staticChart"></div>
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

const echarts = require('echarts')

@Component({
   watch: {
    staticChartOpt() {
      this.renderStaticChart()
    },
  },
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

  staticChart = ''
  staticChartOpt = ''

  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.userInfo.lastLoginTime = formatTime(this.userInfo.lastLoginTime)
    this.userInfo.createdTime = formatTime(this.userInfo.createdTime)
  }

  mounted() {
    const oStaticChart = this.$refs['staticChart']
    this.staticChart = echarts.init(oStaticChart)

    this.getStaticChartOpt()
  }

  getStaticChartOpt() {
    this.staticChartOpt = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
      },
      calculable : true,
      series : [
        {
          name:'面积模式',
          type:'pie',
          radius : [30, 110],
          center : ['50%', '50%'],
          roseType : 'area',
          data:[
            {value:10, name:'rose1'},
            {value:5, name:'rose2'},
            {value:15, name:'rose3'},
            {value:25, name:'rose4'},
            {value:20, name:'rose5'},
            {value:35, name:'rose6'},
            {value:30, name:'rose7'},
            {value:40, name:'rose8'}
          ]
        }
      ]
    }

    this.renderStaticChart()
  }

  renderStaticChart() {
    this.staticChart.setOption(this.staticChartOpt, false, false);
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
