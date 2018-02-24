<template>
  <div>
    <ta-form class="ta-form" :rules="rules">
      <ta-form-item
        prop="name"
        v-model="newTagName"
        placeholder="请输入标签名"
        :rules="rules.name">
      </ta-form-item>
      <ta-form-item
        prop="value"
        v-model="newTagValue"
        placeholder="请输入标签值，仅接受英文"
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
export default class Tag extends Vue {
  newTagName = ''
  newTagValue = ''

  rules = {
    name:[
      { required: true, message: '标签名不得为空', trigger: 'blur' },
    ],
    value: [
      { required: true, message: '标签值不得为空', trigger: 'blur' },
    ]
  }

  isLetter() {
    if (
      !this.newTagValue 
      || !(/^[a-zA-Z]*$/g).test(this.newTagValue)
    ) {
      return new Error('标签值仅接受英文')
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
