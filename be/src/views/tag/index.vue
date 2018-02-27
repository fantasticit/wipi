<template>
  <div>
    <ta-form 
      class="ta-form" 
      :rules="rules"
      @submit="ok()">
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
import { TagProvider } from '@/provider/tag-provider'

@Component({
  watch: {
    '$route'() {
      const id = this.$route.params['tagId'] || null
      if (!id) {
        this.reset()
      }
    }
  },
})
export default class Tag extends Vue {
  tagId = ''
  newTagName = ''
  newTagValue = ''
  loading = false
  rules = {
    name:[
      { required: true, message: '标签名不得为空', trigger: 'blur' },
    ],
    value: [
      { required: true, message: '标签值不得为空', trigger: 'blur' },
    ]
  }

  created() {
    const id = this.$route.params['tagId']
    if (id) {
      this.tagId = id
      this.fetchTag()
    }
  }

  isLetter() {
    if (
      !this.newTagValue 
      || !(/^[a-zA-Z0-9]+[_|-]?[a-zA-Z0-9]*$/g).test(this.newTagValue)
    ) {
      return new Error('标签值仅接受英文')
    } else {
      return ''
    }
  }

  async fetchTag()  {
    this.loading = true

    try {
      const res= await TagProvider.getTag(this.tagId)
      
      this.newTagName = res.title
      this.newTagValue = res.value
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.loading = false
    }
  }

  ok() {
    if (this.tagId) {
      this.updateTag()
    } else {
      this.addTag()
    }
  }

  reset() {
    this.newTagName = ''
    this.newTagValue = ''
  }

  async updateTag()  {
    this.loading = true

    try {
      const res= await TagProvider.updateTag(this.tagId, {
        title: this.newTagName, 
        value: this.newTagValue
      })
      this.$message.success(res)
      this.$router.go(-1)
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.loading = false
    }
  }

  async addTag()  {
    this.loading = true

    try {
      const res= await TagProvider.addTag(this.newTagName, this.newTagValue)
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
