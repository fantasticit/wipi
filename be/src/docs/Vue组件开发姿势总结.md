# 前言
临近毕业，写了个简单个人博客，项目地址是[点我访问项目地址](https://github.com/mvpzx/elapse)（顺便求star），本篇是系列总结第一篇。接下来会一步一步模仿一个低配版的[Element 的`对话框`和`弹框`组件](http://element.eleme.io/#/zh-CN/component/message-box)。

# 正文
## Vue 单文件组件开发
当使用`vue-cli`初始化一个项目的时候，会发现`src/components`文件夹下有一个`HelloWorld.vue`文件，这便是
单文件组件的基本开发模式。

```
// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 创建根实例
new Vue({
  el: '#example'
})
```

接下来，开始写一个`dialog`组件。

## Dialog
目标对话框组件的基本样式如图：

![dialog基本样式](https://user-gold-cdn.xitu.io/2018/3/3/161eac09b777d4d9?w=815&h=373&f=png&s=5988)

根据目标样式，可以总结出：

1. dialog组件需要一个`title`props来标示弹窗标题
2. dialog组件需要在按下`确定`按钮时`发射`出`确定`事件（即告诉父组件`确定`了）
3. 同理，dialog组件需要`发射`出`取消`事件
4. dialog组件需要提供一个插槽，便于自定义内容

那么，编码如下:

```
<template>
  <div class="ta-dialog__wrapper">
    <div class="ta-dialog">
      <div class="ta-dialog__header">
        <span>{{ title }}</span>
        <i class="ios-close-empty" @click="handleCancel()"></i>
      </div>
      <div class="ta-dialog__body">
        <slot></slot>
      </div>
      <div class="ta-dialog__footer">
        <button @click="handleCancel()">取消</button>
        <button @click="handleOk()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    title: {
      type: String,
      default: '标题'
    },
  },

  methods: {
    handleCancel() {
      this.$emit('cancel')
    },

    handleOk() {
      this.$emit('ok')
    },
  },
}
</script>
```

这样便完成了`dialog`组件的开发，使用方法如下：

```
<ta-dialog 
  title="弹窗标题" 
  @ok="handleOk" 
  @cancel="handleCancel">
  <p>我是内容</p>
</ta-dialog>
```

这时候发现一个问题，通过使用`v-if`或者`v-show`来控制弹窗的展现时，*没有动画！！！*，看上去很生硬。`教练，我想加动画`,这时候就该`transition`组件上场了。使用`transition`组件结合`css`能做出很多效果不错的动画。接下来增强`dialog`组件动画，代码如下:

```

<template>
  <transition name="slide-down">
    <div class="ta-dialog__wrapper" v-if="isShow">
      // 省略
    </div>
  </transition>
</template>

<script>
export default {

  data() {
    return {
      isShow: true
    }
  },

  methods: {
    handleCancel() {
      this.isShow = false
      this.$emit('cancel')
    },

    handleOk() {
      this.isShow = true
      this.$emit('ok')
    },
  },
}
</script>

```

可以看到`transition`组件接收了一个`name`props，那么怎么编写`css`完成动画呢？很简单的方式，写出两个
关键`class`(css 的 className)样式即可：

```
.slide-down-enter-active {
  animation: dialog-enter ease .3s;
}

.slide-down-leave-active {
  animation: dialog-leave ease .5s;
}

@keyframes dialog-enter {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dialog-leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
```
就是这么简单就开发出了效果还不错的动效，注意`transition`组件的`name`为`slide-down`,而编写的动画的关键`className`为`slide-down-enter-active`和`slide-down-leave-active`。

## 封装`Dialog`做`MessageBox`
Element的`MessageBox`的使用方法如下:

```
this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(() => {
  this.$message({
    type: 'success',
    message: '删除成功!'
  });
}).catch(() => {
  this.$message({
    type: 'info',
    message: '已取消删除'
  });          
});
```

看到这段代码，我的感觉就是*好神奇**好神奇**好神奇*（惊叹三连）。仔细看看，这个组件其实就是一个封装好的`dialog`,

![Element MessageBox效果](https://user-gold-cdn.xitu.io/2018/3/3/161eac09b7644449?w=843&h=776&f=png&s=86162)

接下来，我也要封装一个这样的组件。首先，整理下思路：

1. Element的使用方法是`this.$confirm`，这不就是挂到`Vue`的`prototype`上就行了
2. Element的`then`是确定，`catch`是取消，`promise`就可以啦

整理好思路，我就开始编码了：

```
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
  const propsData = { tip, title, ...opts }

  instance = new Ctur({ propsData }).$mount()
  instance.reject = reject
  instance.resolve = resolve
  instance.callback = callback

  document.body.appendChild(instance.$el)
})


const confirm = (tip, title, opts) => showMessageBox(tip, title, opts)

Vue.prototype.$confirm = confirm

```

至此，可能会疑惑怎么`callback`呢，其实我编写了一个封装好的`dialog`并将其命名为`MessageBox`,
它的代码中，有这样两个方法:

```
onCancel() {
  this.visible = false
  this.callback && (this.callback.call(this, 'cancel'))
},

onConfirm() {
  this.visible = false
  this.callback && (this.callback.call(this, 'confirm'))
},
```

没错，就是`确定`和`取消`时进行`callback`。我还想说一说`Vue.extend`,代码中引入了`MessageBox`,
我不是直接`new MessageBox`而是借助`new Ctur`，因为这样可以`定义数据(不仅仅是props)`，例如：

```
instance = new Ctur({ propsData }).$mount()
```

这时候，页面上其实是还没有`MessageBox`的，我们需要执行:

```
document.body.appendChild(instance.$el)
```

如果你直接这样，你可能会发现`MessageBox`打开的时候没有动画，而关闭的时候有动画。解决方法也很简单，
`appendChild`的时候让其仍是不可见，然后使用类这样的代码：

```
Vue.nextTick(() => instance.visible = true)
```

这样就有动画了。

# 总结
1. 通过`transition`和`css`实现不错的动画。其中，`transition`组件的`name`决定了编写`css`的两个关键
  类名为`[name]-enter-active`和`[name]-leave-active`

2. 通过`Vue.extend`继承一个组件的构造函数（不知道怎么说合适，就先这样说），然后通过这个构造函数，便可以
  实现组件相关属性的自定义（使用场景：js调用组件）

3. js调用组件时，为了维持组件的动画效果可以先`document.body.appendChild` 然后`Vue.nextTick(() => instance.visible = true)`

到此，简单的Vue组件开发就总结完了，我写的相关代码在[地址](https://github.com/mvpzx/elapse/tree/master/be/src/components)，欢迎指正批评，求star...
