<template>
  <div>
    <ta-form class="ta-form" :rules="rules">
      <ta-form-item
        prop="name"
        v-model="newClassifyName"
        placeholder="请输入分类名"
        :rules="rules.name">
      </ta-form-item>
      <ta-form-item
        prop="value"
        v-model="newClassifyValue"
        placeholder="请输入分类值，仅接受英文"
        :rules="rules.value"
        :validator="isLetter">
      </ta-form-item>
      <ta-button type="primary">提交</ta-button>
    </ta-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component()
export default class Classify extends Vue {
  newClassifyName = ''
  newClassifyValue = ''

  rules = {
    name:[
      { required: true, message: '分类名不得为空', trigger: 'blur' },
    ],
    value: [
      { required: true, message: '分类值不得为空', trigger: 'blur' },
    ]
  }

  isLetter() {
    if (
      !this.newClassifyValue 
      || !(/^[a-zA-Z]*$/g).test(this.newClassifyValue)
    ) {
      return new Error('分类值仅接受英文')
    } else {
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@include b(form) {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 15px;

  button {
    width: 100%;
    margin-top: 22px;
  }
}
</style>
