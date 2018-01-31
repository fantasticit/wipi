import Vue from 'vue'
import TaMessage from './src'

export default function Message(message, type = 'info') {
  const Ctur = Vue.extend(TaMessage)
  const instance = new Ctur({ data: { message, type } }).$mount()
  instance.show()
  document.body.appendChild(instance.$el)

  setTimeout(() => instance.close(), 3000)
}
