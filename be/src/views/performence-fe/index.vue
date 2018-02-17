<template>
  <div class="ta-page">
    <ta-alert>前端页面性能记录取最接近当前时间的30条，每一分钟更新一次</ta-alert>
    <div class="ta-page__head">
      <div>
        <ta-button
          v-for="(project, i) in projects"
          :key="i"
          type="small"
          :class="{'is-active': selectedProject === project}"
          @click="setProject(project)">
          {{ project }}
        </ta-button>
      </div>
    </div>
    <div ref="chart" class="ta-page__chart"></div>
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

    chartOption() {
      this.renderChart()
    }
  },

  routeBeforeLeave(to, from, next) {
    console.log(to)
    console.log(this)
  }
})
export default class FePerformence extends Vue {
  chart = null
  firstScreenTimes = []
  allLoadedTimes = []
  recordDates = []
  timer = null
  chartOption = {}
  projects = ['Elapse-Admin', 'Elapse-Front']
  selectedProject = 'Elapse-Admin'

  mounted() {
    const oChart = this.$refs['chart']
    this.chart = echarts.init(oChart)

    this.$loading.start()
    this.fetchPerformences()
    this.$loading.close()

    // this.timer = setInterval(this.fetchPerformences, 60000)
  }

  setProject(project) {
    this.selectedProject = project
  }

  async fetchPerformences() {
    try { 
      const res = await ReportProvider.getFePerformences(this.selectedProject)

      this.firstScreenTimes = []
      this.allLoadedTimes = []
      this.recordDates = []

      if (res.items.length <= 0) {
        this.$message.info('暂无数据')
      }

      res.items.map(performance => {
        this.firstScreenTimes.push(performance.firstScreenTime)
        this.allLoadedTimes.push(performance.allLoadedTime)
        this.recordDates.push(formatTime(performance.visitDateTime))
      })

      this.getChartOption()
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  getChartOption() {
    this.chartOption = {
      color: ['#006699', '#4cabce',],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['首屏耗时', '加载耗时']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          data: this.recordDates
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '首屏耗时',
          type: 'bar',
          barGap: 0,
          data: this.firstScreenTimes
        },
        {
          name: '加载耗时',
          type: 'bar',
          data: this.allLoadedTimes
        },
      ]
    }
  }

  renderChart() {
    this.chart.setOption(this.chartOption, false, false);
  }
}
</script>

<style lang="scss" scoped>
@include b(page) {
  background: #fff;
  padding: 15px;

  @include flexLayout(flex-start) {
    flex-direction: column;
  }

  @include e(head) {
    padding: 15px  0;
    text-align: center;

    button.is-active {
      background: $primary;
      color: #fff;
    }
  }

  @include e(chart) {
    flex: 1;
    min-height: 500px;
  }
}
</style>
