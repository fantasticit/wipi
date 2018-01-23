# 后端管理系统
使用Vue.js、vue-router、vuex、axios、sass。

## 表单验证
针对`form-itm`开发了组件,用法如下:

```
<fa-form-item 
  placeholder="请输入密码" type="password" v-model="password" :rules="passwordRules"
  @success="successPassed()" @fail="failPassed()">
</fa-form-item>

passwordRules = [
  { required: true, message: '密码不得为空', trigger: 'blur' },
  { min: 5, max: 16, message: '密码长度应在5到16之间', trigger: 'blur' }
]
```

根据传入的验证规则会在触发`trigger`时依次验证,原理大致如下:

```
on(this.$refs['input'], trigger, () => {
  Promise.all(this.$props.rules.reduce((validates, rule) => {
    validates.push(asyncValidate(rule, this.currentValue))
    return validates
  }, []))
    .then(msg => {
      this.showInvalidTip = false
      this.message = ''
      // 验证通过
      this.$emit('success', true)
    })
    .catch(err => {
      this.showInvalidTip = true
      this.message = err
      // 验证失败
      this.$emit('fail', false)
    })
})
```
这里借助了`Promise.all`来实现依次验证,其中`asyncValidate(rule, target)`返回的是一个promise对象.
(这里的`on`其实就是document.addEventListener)

## 网页全屏
控制全屏的代码来自网络,具体如下:

```
// 全屏
function fullScreen() {
  const doc = document.documentElement
  if (doc.requestFullscreen) {
    doc.requestFullscreen()
  } else if (doc.mozRequestFullScreen) {
    doc.mozRequestFullScreen()
  } else if (doc.webkitRequestFullScreen) {
    doc.webkitRequestFullScreen()
  } else if (doc.msRequestFullScreen) {
    doc.msRequestFullScreen()
  }
}

// 退出全屏
function exitFullScreen() {
  const doc = document.documentElement
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msCancelFullScreen) {
    document.msCancelFullScreen()
  }
}
```

## Markdown 编辑器
这里使用了开源库`simplemde`,使用方法可以从github搜索.此外,markdown转html使用了开源库`showdown`,使用方法也很简单:

```
import('showdown').then(showdown => {
  const convert = new showdown.Converter()
  const html = convert.makeHtml(this.article)
  return html
})
```

## 文件上传
### 文件拖拽
文件拖拽上传主要用到了事件`dragover`和`drop`.注意调用时,要阻止浏览器的默认事件,即:`e.preventDefault()`,具体文件的信息获取通过`e.dataTransfer.files`:

```
on(upload, 'drop', e => {
  e.stopPropagation()
  e.preventDefault()
  const file = e.dataTransfer.files[0]
  this.handleFile(file) // 对file的操作方法
})
```
### 点击上传
点击上传的原理是:监听点击事件,当某个节点被点击了,则处罚`input[type=file]`的点击:

```
on(upload, 'click', e => {
  input.click()
})

on(input, 'change', e => {
  this.handleFile(input.files[0])
})
```

当然`file`的获取也需要通过`input[type=file]`
