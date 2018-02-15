<template>
  <div class="ta-page">
    <ta-alert>接口性能记录取全部，每一分钟更新一次</ta-alert>
    <div class="ta-page__charts">
      <div class="ta-page__chart">
        <div class="head">
          <ta-icon name="pie-graph"></ta-icon>
          <span>接口调用次数</span>
        </div>
        <div class="body" ref="callTimeChart"></div>
      </div>

      <div class="ta-page__chart">
        <div class="head">
          <ta-icon name="stats-bars"></ta-icon>
          <span>接口平均响应时间（/ms）</span>
        </div>
        <div class="body" ref="avarageChart">1</div>
      </div>
    </div>
    <div class="ta-page__charts">
      <div class="ta-page__chart ta-page__chart--full">
        <div class="head">
          <ta-icon name="arrow-graph-down-right"></ta-icon>
          <ta-select label="具体接口分析" :options="apiList" v-model="selectedApi"></ta-select>
        </div>
        <div class="body" ref="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatTime } from '@/util/format-time'
import { ReportProvider } from '@/provider/report-provider'

const echarts = require('echarts')

@Component({
  watch: {
    selectedProject() {
      this.fetchPerformences()
    },

    selectedApi() {
      this.fetchPerformences()
    },

    chartOption() {
      this.renderChart()
    },

    avarageChartOption() {
      this.renderAvarageChart()
    },

    callTimeChartOption() {
      this.renderCallTimeChart()
    }
  },

  routeBeforeLeave(to, from, next) {
    console.log(to)
    console.log(this)
  }
})
export default class ApiPerformence extends Vue {
  timer = null
  
  apiList = []
  selectedApi = '/feperformence'

  chart = null
  chartOption = {}

  avarageChart = ''
  avarageChartOption = {}

  callTimeChart = ''
  callTimeChartOption = {}

  created() {
    this.fecthApiList()
    this.fetchApiCallTimes()
    this.fetchApiAvarageResTime()
  }

  mounted() {
    const oChart = this.$refs['chart']
    const oCallTimeChart = this.$refs['callTimeChart']
    const oAvarageChart = this.$refs['avarageChart']


    this.chart = echarts.init(oChart)
    this.avarageChart = echarts.init(oAvarageChart)
    this.callTimeChart = echarts.init(oCallTimeChart)

    this.$loading.start()
    this.fetchPerformences()
    this.$loading.close()

    this.timer = setInterval(() => {
      this.fetchPerformences()
      this.fetchApiCallTimes()
      this.fetchApiAvarageResTime()
    }, 60000)
  }

  async fecthApiList() {
    try { 
      const res = await ReportProvider.getApiList()
      this.apiList = res.map(api => {
        const item =  {}
        item.value = api
        item.title = api

        return item
      })
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  async fetchApiAvarageResTime() {
    try { 
      const res = await ReportProvider.getApiAvarageResTime()
      this.getAvarageChartOption(res)
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  async fetchApiCallTimes() {
    try { 
      const res = await ReportProvider.getApiCallTimes()
      this.getCallTimeChartOption(res)
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  async fetchPerformences() {
    try { 
      const res = await ReportProvider.getApiPerformences(this.selectedApi)
      this.getOption(res)
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  getOption(data) {
    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: data.map(item => formatTime(item.dateTime)),
      },
      yAxis: {
        splitLine: {
          show: false
        }
      },
      dataZoom: [{
        startValue: formatTime(data[0].dateTime)
      }, {
        type: 'inside'
      }],
      visualMap: {
        top: 10,
        right: 10,
        pieces: [{
          gt: 0,
          lte: 50,
          color: '#096'
        }, {
          gt: 50,
          lte: 100,
          color: '#ffde33'
        }, {
          gt: 100,
          lte: 150,
          color: '#ff9933'
        }, {
          gt: 150,
          lte: 200,
          color: '#cc0033'
        }, {
          gt: 200,
          lte: 300,
          color: '#660099'
        }, {
          gt: 300,
          color: '#7e0023'
        }],
        outOfRange: {
          color: '#999'
        }
      },
      series: {
        name: '响应时间',
        type: 'line',
        data: data.map(item => item.responseTime),
        markLine: {
          silent: true,
          data: [{
              yAxis: 50
          }, {
              yAxis: 100
          }, {
              yAxis: 150
          }, {
              yAxis: 200
          }, {
              yAxis: 300
          }]
        }
      }
    }
  }

  getAvarageChartOption(data) {
    this.avarageChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: Object.keys(data)
      },
      series: [
        {
          name: '平均响应时间',
          type: 'bar',
          data: Object.keys(data).map(key => data[key])
        },
      ]
    }
  }

  getCallTimeChartOption(data) {
    this.callTimeChartOption = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [
        {
          name: '访问接口',
          type: 'pie',
          radius : '60%',
          center: ['50%', '60%'],
          data: Object.keys(data).reduce((records, key) => {
            records.push({
              name: key,
              value: data[key]
            })

            return records
          }, []),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  renderChart() {
    this.chart.setOption(this.chartOption, false, false)
  }

  renderAvarageChart() {
    this.avarageChart.setOption(this.avarageChartOption, false, false);
  }

  renderCallTimeChart() {
    this.callTimeChart.setOption(this.callTimeChartOption, false, false);
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
