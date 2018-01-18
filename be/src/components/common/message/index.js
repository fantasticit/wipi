import Vue from 'vue'
import TaMessage from './src'

function message(message, type = 'info') {
  const Ctur = Vue.extend(TaMessage)
  const instance = new Ctur({ data: { message, type } }).$mount()
  instance.show()
  document.body.appendChild(instance.$el)

  setTimeout(() => instance.close(), 3000)
}

Vue.prototype.$message = message
Vue.prototype.$message.error = (msg) => message(msg, 'error')
Vue.prototype.$message.success = (msg) => message(msg, 'success')
Vue.prototype.$message.warning = (msg) => message(msg, 'warning')