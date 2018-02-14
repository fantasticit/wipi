<template>
  <div class="page">
    <h1>Fe Performence</h1>
    <div ref="chart" class="ta-chart"></div>
    <ta-select
      label="Project"
      placeholder="select project">
    </ta-select>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { ReportProvider } from '@/provider/report-provider'

const echarts = require('echarts')

@Component({
  watch: {
    chartOption() {
      this.renderChart()
    }
  }
})
export default class FePerformence extends Vue {
  chart = null
  firstScreenTimes = []
  allLoadedTimes = []
  recordDates = []
  timer = null
  chartOption = {}


  mounted() {
    const oChart = this.$refs['chart']
    this.chart = echarts.init(oChart)

    this.$loading.start()
    this.fetchPerformences()
    this.$loading.close()

    this.timer = setInterval(this.fetchPerformences, 2000)
  }

  async fetchPerformences() {
    try {
      const res = await ReportProvider.getPerformences()

      const firstScreenTimes = []
      const allLoadedTimes = []
      const recordDates = []

      res.items.map(performance => {
        firstScreenTimes.push(performance.firstScreenTime)
        allLoadedTimes.push(performance.allLoadedTime)
        recordDates.push(performance.visitDateTime)
      })

      if (firstScreenTimes.length === this.firstScreenTimes.length) {
        this.timer && clearInterval(this.timer)
        return
      } else {
        this.firstScreenTimes = firstScreenTimes
        this.allLoadedTimes = allLoadedTimes
        this.recordDates = recordDates
        this.getChartOption()
      }
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  renderChart() {
    this.chart.setOption(this.chartOption, false, false);
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
        data: ['FirstScreenTime', 'AllLoadedTime']
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
            name: 'FirstScreenTime',
            type: 'bar',
            barGap: 0,
            data: this.firstScreenTimes
        },
        {
            name: 'AllLoadedTime',
            type: 'bar',
            data: [...this.allLoadedTimes]
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: #fff;
  padding: 15px;
}

@include b(chart) {
  height: 600px;
}
</style>
