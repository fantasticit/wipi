# 后端管理系统
使用Vue.js、vue-router、vuex、axios、sass以及element-ui。

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