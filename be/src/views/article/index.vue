<template>
  <ta-container>
    <div class="ta-toolbar">
      <ta-button @click="showHtml()">预览HTML</ta-button>
      <ta-button type="primary" @click="openPublishArticle()">发布文章</ta-button>
    </div>
    <ta-markdown-editor class="ta-editor" v-model="article"></ta-markdown-editor>
    <ta-publish-dialog 
      :isShow="isShowDialog" 
      @cancel="cancelPublish()"
      @ok="publishArticle()"
    >
    </ta-publish-dialog>
  </ta-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TaMarkdownEditor from '@/components/common/markdown-editor'
import TaPublishDialog from './dialog.vue'

@Component({
  components: {
    TaMarkdownEditor,
    TaPublishDialog,
  },
})
export default class Article extends Vue {
  article = '# Test'
  isShowDialog = false
  
  transfor2Html() {
    return Promise.resolve(import('showdown').then(showdown => {
      const convert = new showdown.Converter()
      const html = convert.makeHtml(this.article)
      return html
    }))
  }
  
  openPublishArticle() {
    this.isShowDialog = true
  }

  publishArticle() {
    this.transfor2Html().then(html => console.log(html))
  }

  cancelPublish() {
    this.isShowDialog = false
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
