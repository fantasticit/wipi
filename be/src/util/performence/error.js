import Vue from 'vue'
import { on } from '../event'
import { ReportProvider } from '@/provider/report-provider'

// on(window, 'error', err => {
//   let { colno, lineno, message } = err
//   let target = err.target || err.srcElement


//   console.log(err)
// })


Vue.config.errorHandler = (error, vm, info) => {
  console.log(vm)
  console.log(error)
  const appName = 'Elapse-Admin'
  ReportProvider.reportFeError({error, vm: vm.$route && vm.$route.fullPath || vm.$options.name, info, appName})
    .then(() => console.log('已记录页面错误'))
    .catch(() => console.log('记录页面错误失败'))
}
