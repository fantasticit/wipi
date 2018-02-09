import Vue from 'vue'
import Main from './src/index.vue'
const NotificationConstructor = Vue.extend(Main)

let count = 0
const notification = function (options, delay) {
  count++ // 计数器加一

  options = options || {}
  delay = delay || (2000 + (count - 1) * 600)

  let instance = new NotificationConstructor({
    data: options
  })
  instance.vm = instance.$mount()

  // 挂载 通知dom
  document.body.appendChild(instance.vm.$el)
  Vue.nextTick(() => instance.show = true)

  // 定时移除
  setTimeout(() => {
    instance.vm.close()
    --count // 相应计数器减一
  }, delay)
}

export default notification
