import Vue from 'vue'
import MessgaeBox from './src/index'

const Ctur = Vue.extend(MessgaeBox)
let instance = null

const callback = action => {
  if (action === 'confirm') {
    if (instance.showInput) {
      instance.resolve({ value: instance.inputValue, action })
    } else {
      instance.resolve(action)
    }
  } else {
    instance.reject(action)
  }

  instance = null
}

const showMessageBox = (tip, title, opts) => new Promise((resolve, reject) => {
  !!instance && (instance.visible = false)
  const propsData = { tip, title, ...opts }
  instance = new Ctur({ propsData }).$mount()
  instance.reject = reject
  instance.resolve = resolve
  instance.callback = callback

  document.body.appendChild(instance.$el)
  Vue.nextTick(() => instance.visible = true)
})


const confirm = (tip, title, opts) => showMessageBox(tip, title, opts)

const prompt = (tip, title, opts) => {
  opts = { ...opts, showInput: true }
  return showMessageBox(tip, title, opts)
}

// prompt('此操作将永久删除该文件, 是否继续?', '提示', {})
//   .then(({value}) => console.log(value))
//   .catch(e => console.log(e))

export { confirm, prompt }
