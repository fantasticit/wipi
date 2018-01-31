import Vue from 'vue'
import Main from './src/index.vue'
const NotificationConstructor = Vue.extend(Main)

let count = 0;
const Notification = function (options, delay) {
  count++; // 计数器加一

  options = options || {};
  delay = delay || (2000 + (count - 1) * 600)

  let instance = new NotificationConstructor({
    data: options
  })
  
  instance.vm = instance.$mount()

  // 挂载 通知dom
  document.body.appendChild(instance.vm.$el)

  // 定时移除
  setTimeout(() => {
    instance.vm.close()
    --count // 相应计数器减一
  }, delay)
}

Notification({
  type: 'success',
  title: '成功',
  msg: 1
})

Notification({
  type: 'error',
  title: '失败',
  msg: 1
})

Notification({
  type: 'info',
  title: '信息',
  msg: 1
})

export default Notification
