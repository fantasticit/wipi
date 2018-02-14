import { ReportProvider } from '@/provider/report-provider'
import { domContentLoaded } from './dom-content-loaded'

~function (){
  // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。
  domContentLoaded(() => {
    const totalHeight = window.pageYOffset || document.documentElement.scrollTop // 页面总高度
    const viewHeight = document.documentElement.clientHeight                     // 页面可视高度

    const imgs = Array.from(document.querySelectorAll('img')).map(img => {       // 在首屏的图片
      const offsetTop = img.getBoundingClientRect().top + viewHeight // 图片所在高度
      return offsetTop < totalHeight ? img : null
    })

    const imgsLoadedTime = []                                                    // 图片加载所需时间
    let endTime = + new Date                                                     // 结束时间
    if (imgs.length > 0) {
      imgs.forEach(img => {
        if (!img || img.complete) {
          return
        }

        const image = new Image()
        image.src = img.src
        image.onload = () => imgsLoadedTime.push(+ new Date)
        image.onerror = () => imgsLoadedTime.push(+ new Date)
      })
    } else {
      endTime = + new Date
    }

    // load 应该仅用于检测一个完全加载的页面。 
    window.onload = () => {
      if (imgsLoadedTime.length > 0) {
        endTime = Math.max.apply(null, imgsLoadedTime)
      }
      const firstScreenTime = endTime - loadStartTime
      console.log('首屏时间: ', firstScreenTime)
      const allLoadedTime = + new Date() - loadStartTime

      ReportProvider.reportPerformence({
        firstScreenTime,
        allLoadedTime,
        appName: 'Elapse-Admin',
      }).then()
        .catch(e => {
          throw new Error('report fe performence failed')
        })
    }
  })
}()
