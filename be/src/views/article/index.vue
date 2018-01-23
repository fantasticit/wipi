<template>
  <ta-container>
    <div class="ta-toolbar">
      <ta-button type="primary" @click="openPublishDialog()">发布文章</ta-button>
    </div>
    <div>
      <div class="ta-subcontainer">
        <label>文章概述</label>
        <textarea class="ta-textarea" v-model="desc"></textarea>
      </div>
      <div class="ta-subcontainer">
        <label>文章内容</label>
        <ta-markdown-editor class="ta-editor" v-model="article"></ta-markdown-editor>
      </div>
    </div>
    <ta-publish-dialog :isShow="isShowDialog" @ok="publishArticle()" @cancel="closePublishDialog()">
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
  desc = ''
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
    if (!this.article || !this.desc) {
      this.$message.error('文章信息为为空')
      return
    }
    this.isShowDialog = true
  }

  closePublishDialog() {
    this.isShowDialog = false
  }

  addTag(tag) {
    if (this.tags.length >= 4) {
      this.$message.error('最多4个标签')
    } else {
      this.tags.push(tag)
    }
  }

  removeTag(index) {
    let tags = Array.from(this.tags)
    tags.splice(index, 1)
    this.tags = tags
  }

  publishArticle(info) {
    this.loading = true
    this.transfor2Html().then(async (content_html) => {
      const article = Object.assign({}, info, {
        desc: this.desc,
        content_md: this.article,
        content_html
      })

      try {
        const res = await ArticleProvider.add(article)
        this.$message.success(res)
        this.closePublishDialog()
        this.article = ''
        this.desc = ''
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
  height: 80%;
}

@include b(subcontainer) {
  margin-bottom: 22px;
  @include flexLayout(flex-start);

  textarea, div {
    flex: 1;
  }
  
  label {
    display: inline-flex;
    width: 5em;
  }
}
</style>
