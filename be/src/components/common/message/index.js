import Vue from 'vue'
import TaMessage from './src'

let count = 0
let delay = 2400

export default function Message(message, type = 'info') {
  const Ctur = Vue.extend(TaMessage)
  const instance = new Ctur({ data: { message, type } }).$mount()

  document.body.appendChild(instance.$el)
  Vue.nextTick(() => instance.show())
  count++
  
  setTimeout(() => {
    instance.close()
    count--
  }, delay + 600 * count)
}
