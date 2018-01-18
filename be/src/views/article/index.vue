<template>
  <ta-container>
    <div class="ta-toolbar">
      <ta-button @click="showHtml()">预览HTML</ta-button>
      <ta-button type="primary" @click="publishArticle()">发布文章</ta-button>
    </div>
    <ta-markdown-editor class="ta-editor" v-model="article"></ta-markdown-editor>
  </ta-container>

  
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TaMarkdownEditor from '@/components/common/markdown-editor'

@Component({
  components: {
    TaMarkdownEditor,
  },
})
export default class Article extends Vue {
  article = '# Test'

  showHtml() {
    return Promise.resolve(import('showdown').then(showdown => {
      const convert = new showdown.Converter()
      const html = convert.makeHtml(this.article)
      return html
    }))
  }
  
  publishArticle() {
    this.showHtml().then(html => alert(html))
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
