<template>
  <div>
    <ta-form 
      class="ta-form" 
      :rules="rules"
      @submit="ok()">
      <ta-form-item
        prop="name"
        v-model="title"
        placeholder="请输入标签名"
        :rules="rules.name">
      </ta-form-item>
      <ta-form-item
        prop="value"
        v-model="value"
        placeholder="请输入标签值，仅接受英文"
        :rules="rules.value"
        :validator="isLetter">
      </ta-form-item>
      <ta-button 
        type="primary" 
        :loading="loading">
      {{ !!tagId ? '更新' : '提交' }}
      </ta-button>
    </ta-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { ClassifyProvider } from '@/provider/classify-provider'

@Component({
  watch: {
    '$route'() {
      const id = this.$route.params['classifyId'] || null
      if (!id) {
        this.reset()
      }
    }
  },
})
export default class Tag extends Vue {
  tagId = ''
  title = ''
  value = ''
  loading = false
  rules = {
    name:[
      { required: true, message: '标签名不得为空', trigger: 'blur' },
    ],
    value: [
      { required: true, message: '标签值不得为空', trigger: 'blur' },
    ]
  }
  userId = ''

  created() {
    const id = this.$route.params['classifyId']
    this.userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id

    if (id) {
      this.classifyId = id
      this.fetchClassify()
    }
  }

  isLetter() {
    if (
      !this.value 
      || !(/^[a-zA-Z]*$/g).test(this.value)
    ) {
      return new Error('标签值仅接受英文')
    } else {
      return ''
    }
  }

  async fetchClassify()  {
    this.loading = true

    try {
      const res= await ClassifyProvider.getClassify(this.classifyId)
      
      this.title = res.title
      this.value = res.value
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.loading = false
    }
  }

  ok() {
    if (this.classifyId) {
      this.updateClassify()
    } else {
      this.addClassify()
    }
  }

  reset() {
    this.title = ''
    this.value = ''
  }

  async updateClassify()  {
    this.loading = true

    try {
      const res= await ClassifyProvider.updateClassify(this.classifyId, {
        title: this.title, 
        value: this.value,
        userId: this.userId
      })
      this.$message.success(res)
      this.$router.go(-1)
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.loading = false
    }
  }

  async addClassify()  {
    this.loading = true

    try {
      const res= await ClassifyProvider.addClassify(this.title, this.value, this.userId)
      this.$message.success(res)
      this.reset()
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.loading = false
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
