<template>
  <div class="ta-article">
    <ta-row>
      <ta-col :span="8" :sm="12">
        <div class="ta-article__container">
          <div class="ta-article__item">
            <label>文章标题</label>
            <ta-input
              placeholder="请输入文章标题"
              v-model="title">
            </ta-input>
          </div>
          <div class="ta-article__item">
            <label>文章概述</label>
            <textarea class="ta-textarea" placeholder="请输入文章概述" v-model="desc">
            </textarea>
          </div>
          <div class="ta-article__item">
            <label>文章内容</label>
            <ta-markdown-editor class="editor" ref="editor" v-model="content">
            </ta-markdown-editor>
          </div>
        </div>
      </ta-col>

      <ta-col :span="4" :sm="12">
        <div class="col-md-4 col-lg-4">
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
            <ta-upload :cover="cover" @success="getImageName($event)"></ta-upload>
          </div>
        </div>
        <!-- 文章发布 -->
        <div class="ta-article__prop">
          <div class="header">
            <ta-icon name="ios-book-outline"></ta-icon>
            <span>文章发布</span>
          </div>
          <div class="body">
            <ta-input placeholder="请输入作者" v-model="author">
            </ta-input>
            <ta-select placeholder="请选择文章状态" v-model="state"
              :options="states">
            </ta-select>
          </div>
          <div class="footer">
            <ta-button @click="preview()">预览</ta-button>
            <ta-button type="primary" @click="publish()">发布</ta-button>
          </div>
        </div>
      </div>
      </ta-col>
    </ta-row>
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

  watch: {
    '$route'() {
      const articleId = this.$route.params['articleId'] || null
      if (!articleId) {
        this.reset()
      }
    }
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
  userId = ''                                          // 用户Id
  articleId = null                                     // 文章ID
  title = ''                                           // 文章标题
  desc = ''                                            // 文章描述
  content = ''                                         // 文章内容
  classify = ''                                        // 文章分类
  author = ''                                          // 文章作者
  state = ''                                           // 文章状态
  cover = ''                                           // 文章封面
  tags = []                                            // 文章标签
  loading = false
  tagTypes = ['default', 'info', 'success', 'danger']
  upload = null                                        // 上传组件(VNode)
  
  created() {
    this.$on('mount.upload', vm => {
      this.upload = vm
    })

    const articleId = this.$route.params['articleId'] || null
    this.articleId = articleId
    if (!!this.articleId) {
      this.fetchArticle()
    } else {
      this.author = JSON.parse(window.sessionStorage.getItem('userInfo')).account
      this.userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
    }
  }

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
    this.title = ''
    this.content = ''
    this.desc = ''
    this.classify = ''
    this.tags = []
    this.author = ''
    this.state = ''
    this.cover = ''
    this.upload.reset()
  }

  // 文章预览
  preview() {
    this.$refs['editor'].$el.querySelector('.fa-eye').click()
  }

  // 获取上传后的封面路径
  getImageName(res) {
    this.cover = this.coverPrefix + res.hash
  }

  // 获取文章
  async fetchArticle() {
    this.$loading.start()
    try {
      const article = await ArticleProvider.fetchArticle(this.articleId, this.userId)
      this.title = article.title
      this.desc = article.desc
      this.content = article['content_md']
      this.classify = article.classify
      this.tags = article.tags
      this.cover = article.cover
      this.author = article.author
      this.state = article.state
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  // 发布文章前的转换
  publish() {
    const article = Object.assign({}, {
      title: this.title,
      desc: this.desc,
      cover: this.cover,
      content: this.content,
      classify: this.classify,
      tags: this.tags,
      author: this.author,
      state: this.state,
    })

    const flag = Object.keys(article).every(key => {
      if (key === 'cover') {
        return true
      }
      return !!article[key]
    })

    if (!flag) {
      this.$message.error('请完善文章信息')
    } else {
      if (this.articleId) {
        this.updateArticle(article)
      } else {
        this.publishArticle(article)
      }
    }
  }

  // 转换markdown -> html
  transfor2Html() {
    return Promise.resolve(import('showdown').then(showdown => {
      const convert = new showdown.Converter()
      const html = convert.makeHtml(this.content)
      return html
    }))
  }

   // 转换文章结构
  handleArticle(article) {
    return Promise.resolve(
      this.transfor2Html().then(content_html => {
        return Object.assign({}, article, {
          content_md: this.content,
          content_html
        })
      })
    )
  }

  // 发布文章
  publishArticle(article) {
    this.loading = true
    this.handleArticle(article).then(async article => {
      try {
        const res = await ArticleProvider.addArticle(this.userId, article)
        this.$message.success(res)
        this.reset()
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false
      }
    })
  }

  // 更新文章
  async updateArticle(article) {
    this.loading = true
    this.handleArticle(article).then(async article => {
      try {
        const res = await ArticleProvider.updateArticle(article, this.articleId)
        this.$message.success(res)
        this.reset()
      } catch (err) {
        this.$message.error(err.message)
      } finally {
        this.loading = false
        this.$router.replace('/article')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
