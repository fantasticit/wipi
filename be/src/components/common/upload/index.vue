<template>
  <div class="ta-upload">
    <div
      ref="upload"
      class="ta-upload__container"
      :class="{ 'is-active': draging }">
      <div>
        <ta-icon name="android-upload"></ta-icon>
        <p>将文件拖拽到此处或<span>点击上传</span></p>
      </div>
      <input type="file" multiple>
    </div>
    <transition name="slide-down">
      <div class="ta-upload__tip" v-if="fileName">
        <p>{{ fileName }}</p>
        <p>
          <span>
            {{ isUploading 
                ? '正在上传中...' 
                : (isSuccess ? '上传成功' : '上传失败') 
            }}
          </span>
          <ta-icon 
            v-show="!isUploading" 
            :name="tipIcon" 
            :class="{ 'is-failed': !isSuccess }">
          </ta-icon>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { on } from '@/util/event'
import { QiniuProvider } from '@/provider/qiniu-provider'
import TaIcon from '../icon'
import message from '../message'

export default {
  name: 'TaUpload',

  components: {
    TaIcon
  },

  data() {
    return {
      draging: false,
      fileName: '',
      tipIcon: 'checkmark-circled', // 失败的话就是close-circled
      isUploading: true,            // 正在上传
      isSuccess: true,              // 上传是否成功
      uploadToken: null,            // 七牛上传token
    }
  },

  mounted() {
    const upload = this.$refs['upload']
    const input = upload.querySelector('input')
    this.getQiniuToken()

    on(upload, 'dragover', e => {
      e.stopPropagation()
      e.preventDefault()
      this.draging = true
    })
    on(upload, 'dragleave', e => {
      e.stopPropagation()
      e.preventDefault()
      this.draging = false
    })
    // drop
    on(upload, 'drop', e => {
      e.stopPropagation()
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      this.handleFile(file)
    })
    // 模拟点击了input
    on(upload, 'click', e => {
      input.click()
    })

    on(input, 'change', e => {
      this.handleFile(input.files[0])
    })
  },


  methods: {
    handleFile(file) {
      this.fileName = file.name
      this.draging = false
    },

    async getQiniuToken() {
      try {
        const uploadToken = await QiniuProvider.getQiniuToken()
        this.uploadToken = uploadToken
      } catch (err) {
        message(err.message, 'error')
      }
    }
  }
}
</script>

