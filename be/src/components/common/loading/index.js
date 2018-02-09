import Vue from 'vue'
import TaLoading from './src/'

const Ctor = Vue.extend(TaLoading)
let hasInserted = false

class _Loading {
  constructor(options) {
    this.options = options
    this.instance = new Ctor(this.options).$mount()
  }

  start() {
    if (hasInserted) {
      this.instance.show()
    } else {
      document.body.appendChild(this.instance.$el)
      Vue.nextTick(() => this.instance.inShow = true)
      hasInserted = true
    }
  }
  
  close() {
    this.instance.close()
  }
}

const Loading = new _Loading()

export default Loading
