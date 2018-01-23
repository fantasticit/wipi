import Vue from 'vue'
import TaLoading from './src/'

const Ctor = Vue.extend(TaLoading)

class _Loading {
  instance = null

  constructor(options) {
    this.instance = new Ctor(options).$mount()
  }

  start() {
    document.body.appendChild(Loading.instance.$el)
  }
  
  close() {
    this.instance.close()
  }
}

const Loading = new _Loading()

Vue.prototype.$loading = Loading
Vue.component('TaLoading', TaLoading)

export default Loading
