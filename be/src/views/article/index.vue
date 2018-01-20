<template>
  <ta-container>
    <div class="ta-toolbar">
      <ta-button type="primary" @click="openPublishDialog()">发布文章</ta-button>
    </div>
    <ta-markdown-editor class="ta-editor" v-model="article"></ta-markdown-editor>
    <ta-publish-dialog
      :isShow="isShowDialog"
      :loading="loading" 
      @cancel="closePublishDialog()"
      @ok="publishArticle($event)"
    >
    </ta-publish-dialog>
  </ta-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TaMarkdownEditor from '@/components/common/markdown-editor'
import { ArticleProvider } from '@/provider/article-provider'
import TaPublishDialog from './dialog.vue'

@Component({
  components: {
    TaMarkdownEditor,
    TaPublishDialog,
  },
})
export default class Article extends Vue {
  article = ''
  isShowDialog = false
  loading = false
  
  transfor2Html() {
    return Promise.resolve(import('showdown').then(showdown => {
      const convert = new showdown.Converter()
      const html = convert.makeHtml(this.article)
      return html
    }))
  }
  
  openPublishDialog() {
    this.isShowDialog = true
  }

  closePublishDialog() {
    this.isShowDialog = false
    this.article = ''
  }

  publishArticle(info) {
    this.loading = true
    this.transfor2Html().then(async (content_html) => {
      const article = Object.assign({}, info, {
        content_md: this.article,
        content_html
      })

      try {
        const res = await ArticleProvider.add(article)
        this.$message.success(res)
        this.closePublishDialog()
      } catch (err) {
        this.$message.error('发表文章失败')
      } finally {
        this.loading = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@include b(toolbar) {
  margin-bottom: 15px;
  text-align: right;
}

@include b(editor) {
  height: 70%;
}
</style>
