<template>
  <div class="ta-upload">
    <div class="ta-upload__container">
      <img :src="img" class="img">
      <div class="upload">
        <p>支持大小5M以内的图片</p>
        <ta-button 
          size="small" type="primary" @click="upload()"
          :loading="isUploading">
          {{ isUploading ? '正在上传' : '点击上传' }}
        </ta-button>
        <input ref="uploadInput" type="file" v-show="false">
      </div>
    </div>
  </div>
</template>

<script>
import { on } from '@/util/event'
import { QiniuProvider } from '@/provider/qiniu-provider'
import TaIcon from '../../common/icon'
import message from '../../common/message'
import Emitter from '../../emitter' 

export default {
  name: 'TaUpload',

  components: {
    TaIcon
  },

  mixins: [
    Emitter,
  ],

  props: {
    cover: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      img: this.cover,                    // 预览图
      uploadToken: null,                  // 七牛上传token
      input: '',
      isUploading: false,
    }
  },

  watch: {
    cover(cover) {
      this.img = cover
    }
  },

  created() {
    this.dispatch('mount.upload', [this])
  },

  mounted() {
    this.getQiniuToken()
    this.input = this.$refs['uploadInput']
    
    on(this.input, 'change', e => {
      const file = this.input.files[0]
      this.handleFile(file)
    })
  },


  methods: {
    upload() {
      this.input.click()
    },

    handleFile(file) {
      if (file.size > 5000000) {
        message('图片大小不得超过5M', 'error')
        return
      }

      if (!file.type || !/image/.test(file.type)) {
        message('只允许上传图片', 'error')
        return
      }

      this.fileName = file.name
      this.draging = false

      
      this.uploadFile(file)
    },

    preview(file) {
      const reader = new FileReader()
      reader.onload = () => {
        const url = reader.result
        this.img = url
      }
      reader.readAsDataURL(file)
    },

    async getQiniuToken() {
      try {
        const uploadToken = await QiniuProvider.getQiniuToken()
        this.uploadToken = uploadToken
      } catch (err) {
        message(err.message, 'error')
      }
    },

    async uploadFile(file) {
      this.isUploading = true
      try {
        const res = await QiniuProvider.uploadImage(file, this.uploadToken)
        message('图片上传成功', 'success')
        this.$emit('success', res)
        this.preview(file)
      } catch (err) {
        message(err.message, 'error')
      } finally {
        this.isUploading = false
      }
    },

    check() {
      if (!this.isSuccess) {
        this.reset()
      }
    },

    reset() {
      this.isUploading = false
      this.img = null
    },
  }
}
</script>

<style>
.hover {
  background: #f5faf7;
}
</style>
