import Vue from 'vue'
import TaLoadingbar from './src/index.vue'

const Ctur = Vue.extend(TaLoadingbar)
let instance = null

const Loadingbar = {}

Loadingbar.start = function () {
  instance = new Ctur().$mount()
  document.body.appendChild(instance.$el)
  instance.start()
}

Loadingbar.finish = function () {
  instance.finish()
  instance = null
}

export { Loadingbar }