<template>
  <div class="ta-article">
    <!-- S 左侧文章撰写区 -->
    <div>
      <ta-form-item label="文章标题" placeholder="请输入文章标题" v-model="title">
      </ta-form-item>
      <div class="ta-article__item">
        <label>文章概述</label>
        <textarea class="ta-textarea" placeholder="请输入文章概述" v-model="desc">
        </textarea>
      </div>
      <div class="ta-article__item">
        <label>文章内容</label>
        <ta-markdown-editor class="editor" ref="editor" v-model="article">
        </ta-markdown-editor>
      </div>
    </div>
    <!-- E 左侧文章撰写区 -->

    <!-- S 右侧文章属性区 -->
    <div>
      <!-- 文章分类 -->
      <div class="ta-article__prop">
        <div class="header">
          <ta-icon name="ios-paper-outline"></ta-icon>
          <span>文章分类</span>
        </div>
        <div class="body">
          <ta-select placeholder="请选择文章分类" v-model="classify" :options="classifies">
          </ta-select>
        </div>
      </div>
      <!-- 文章标签 -->
      <div class="ta-article__prop">
        <div class="header">
          <ta-icon name="ios-pricetags-outline"></ta-icon>
          <span>文章标签</span>
        </div>
        <div class="body">
          <ta-form-item placeholder="输入文章标签,回车即可添加" @enter="addTag($event)">
          </ta-form-item>
          <div class="tags">
            <ta-tag v-for="(tag, index) in tags" :key="index" :type="tagTypes[index]"
              @close="removeTag(index)">
              {{ tag }}
            </ta-tag>
          </div>
        </div>
      </div>
      <!-- 文章封面 -->
      <div class="ta-article__prop">
        <div class="header">
          <ta-icon name="ios-cloud-upload-outline"></ta-icon>
          <span>文章封面</span>
        </div>
        <div class="body">
          <ta-upload @success="getImageName($event)"></ta-upload>
        </div>
      </div>
      <!-- 文章发布 -->
      <div class="ta-article__prop">
        <div class="header">
          <ta-icon name="ios-book-outline"></ta-icon>
          <span>文章发布</span>
        </div>
        <div class="body">
          <ta-form-item label="作者" placeholder="请输入作者" v-model="author">
          </ta-form-item>
          <ta-select label="状态" placeholder="请选择文章状态" v-model="state"
            :options="states">
          </ta-select>
        </div>
        <div class="footer">
          <ta-button @click="preview()">预览</ta-button>
          <ta-button type="primary" @click="publish()">发布</ta-button>
        </div>
      </div>
    </div>
    <!-- E 右侧文章属性区 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import TaMarkdownEditor from '@/components/common/markdown-editor'
import { ArticleProvider } from '@/provider/article-provider'

@Component({
  components: {
    TaMarkdownEditor,
  },

  computed: {
    ...mapState('article', {
      classifies: state => state.classifies,
      states: state => state.states,
      coverPrefix: state => state.coverPrefix,
    })
  }
})
export default class Article extends Vue {
  title = 'fffffffff'                                           // 文章标题
  desc = ''                                            // 文章描述
  article = ''                                         // 文章内容
  classify = ''                                        // 文章分类
  author = ''                                          // 文章作者
  state = ''                                           // 文章状态
  cover = ''                                           // 文章封面
  tags = []                                            // 文章标签
  loading = false
  tagTypes = ['default', 'info', 'success', 'danger']

  // 增加标签
  addTag(tag) {
    tag = tag.trim()

    if (tag) {
      if (this.tags.length == 4) {
        this.$message.error('最多4个标签')
      } else {
        this.tags.push(tag)
      }
    }
  }

  // 移除标签
  removeTag(index) {
    this.tags.splice(index, 0)
  }

  // 重置文章信息
  reset() {
    this.article = ''
    this.title = ''
    this.desc = ''
    this.classify = ''
    this.tags = []
    this.author = ''
    this.state = ''
    this.cover = ''
  }

  created() {
    console.log(this)
  }

  // 文章预览
  preview() {
    this.$refs['editor'].$el.querySelector('.fa-eye').click()
  }

  // 发布文章前的转换
  publish() {
    const info = Object.assign({}, {
      title: this.title,
      desc: this.desc,
      cover: this.cover,
      article: this.article,
      classify: this.classify,
      tags: this.tags,
      author: this.author,
      state: this.state,
    })

    console.log(info)
    const flag = Object.keys(info).every(key => !!info[key])

    if (!flag) {
      this.$message.error('请完善文章信息')
    } else {
      this.publishArticle(info)
    }
  }

  // 转换markdown -> html
  transfor2Html() {
    return Promise.resolve(import('showdown').then(showdown => {
      const convert = new showdown.Converter()
      const html = convert.makeHtml(this.article)
      return html
    }))
  }

  // 获取上传后的封面路径
  getImageName(res) {
    this.cover = this.coverPrefix + res.hash
    console.log(this.cover)
  }

  // 发布文章
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
        this.reset()
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
@import './style.scss';
</style>
