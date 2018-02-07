import Vue from 'vue'
import MessgaeBox from './src/index'

const Ctur = Vue.extend(MessgaeBox)
let instance = null

const confirm = (label, title, { 
  confirmButtonText = '确定', 
  cancelButtonText = '取消', 
  type = 'warning' 
}) => {
  return new Promise((resolve, reject) => {
    if(instance) {
      instance.isShow = false
    }

    instance = new Ctur({
      propsData: {
        label,
        title,
        confirmButtonText,
        cancelButtonText,
        type,
      }
    }).$mount()
    
    instance.onCancel = () => {
      instance.isShow = false
      reject('cancel')
    }

    instance.onOk = () => {
      instance.isShow = false
      resolve('ok')
    }
    
    document.body.appendChild(instance.$el)
  })
}

const prompt = (label, title, { 
  confirmButtonText = '确定', 
  cancelButtonText = '取消', 
  rules= [{ required: true, message: '信息不得为空', trigger: 'blur' },]
}) => {
  return new Promise((resolve, reject) => {
    if(instance) {
      instance.isShow = false
    }

    instance = new Ctur({
      propsData: {
        label,
        title,
        confirmButtonText,
        cancelButtonText,
        showInput: true,
        rules,
      }
    }).$mount()
    
    instance.onCancel = () => {
      instance.isShow = false
      reject('cancel')
    }

    instance.onOk = () => {
      if (!instance.passed) { // 表单验证不通过
        const event = new Event(rules[0].trigger || 'blur')
        const input = instance.$refs['input'].$el.querySelector('input')
        input.dispatchEvent(event)
        return
      }
      instance.isShow = false
      resolve({ value: instance.value })
    }

    document.body.appendChild(instance.$el)
  })
}

// prompt('此操作将永久删除该文件, 是否继续?', '提示', {})
//   .then(({value}) => console.log(value))
//   .catch(e => console.log(e))

export { confirm, prompt }
