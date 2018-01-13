import Vue from 'vue'
import FaLoadingbar from './src/index.vue'

const Ctur = Vue.extend(FaLoadingbar)
const instance = new Ctur().$mount()

const Loadingbar = {}

Loadingbar.start = function () {
  document.body.appendChild(instance.$el)
  instance.start()
}

Loadingbar.finish = function () {
  instance.finish()
}

export { Loadingbar }