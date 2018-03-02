const EProgress = function eProgress() {
  const EProgress = {}

  EProgress.config = {
    template: `<div >`
  }

  EProgress.init = function () {
    const oProgress = document.createElement('div')
    oProgress.className = 'eprogress'

    oProgress.style.position = 'fixed'
    oProgress.style.left = '-100%'
    oProgress.style.top = 0
    oProgress.style.zIndex = 1000
    oProgress.style.width = '100%'
    oProgress.style.height = '2px'
    oProgress.style.background = 'red'

    document.body.appendChild(oProgress)

    this.progress = oProgress
  }

  EProgress.start = function () {
    if (this.percent && this.percent > 1) {
      this.close()
    }

    this.init()
    this.inc()
  }

  EProgress.close = function () {
    let timer = null
    const remove = () => {
      try {
        document.body.removeChild(this.progress)
      } catch (e) {}
      clearInterval(timer)
    }

    if (this.percent < 100) {
      timer = setInterval(() => {
        if (this.percent >= 100) {
          remove()
        }

        this.percent += 5
        this.progress.style.transform = `translateX(${this.percent}%)`
      }, Math.random() * 5)
    } else {
      remove()
    }
  }

  EProgress.inc = function() {
    let oProgress = this.progress
    let now = 0
    let timer = null
    let _this = this

    timer = setInterval(function() {
      if (now >= 1) clearInterval(timer)

      now += 0.03
      
      _this.percent = now * 100 > 100 ? 100 : now * 100
      oProgress.style.transform = `translateX(${_this.percent}%)`
    }, Math.random() * 10)
  }

  return EProgress
}()

export { EProgress }
