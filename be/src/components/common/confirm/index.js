import Vue from 'vue'
import Dialog from '../dialog'



const Ctur = Vue.extend(Dialog)
let instance = null

const confirm = () => {
  instance = new Ctur({
    slot: '<p>5</p>'
  }).$mount()
  console.log(instance)

  const v = new Vue({
    template: '<p>50</p>'
  })
  instance.$slots['default'] = v
  document.body.appendChild(instance.$el)

  // return {
  //   render(h) {
  //     return h(Dialog)
  //   }
  // }
}


confirm()

export default confirm
