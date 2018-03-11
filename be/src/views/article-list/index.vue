<template>
  <div class="ta-article-list">
    <!-- S 搜索区 -->
    <div class="ta-searcharea">
      <div class="ta-searcharea__item">
        <span>分类:</span>
        <ta-button 
          v-for="(item, i) in [{ title: '全部', value: '' }, ...classifies]"
          :key="i"
          :type="item.value === classify ? 'primary' : 'text'"
          @click="setClassify(item.value)">
          {{ item.title }}
        </ta-button>
      </div>

      <div class="ta-searcharea__item">
        <span>状态:</span>
        <ta-button 
          v-for="(item, i) in [{ title: '全部', value: '' }, ...states]"
          :key="i"
          :type="item.value === state ? 'primary' : 'text'"
          @click="setState(item.value)">
          {{ item.title }}
        </ta-button>
      </div>

      <div class="ta-searcharea__item">
        <span>搜索:</span>
        <ta-input 
          placeholder="标题,描述" 
          v-model="keyword"
          @enter="search()">
        </ta-input>
        <ta-button 
          type="primary" 
          icon="ios-search-strong"
          :loading="loading"
          @click="search()">
          搜索
        </ta-button>
      </div>
    </div>
    <!-- E 搜索区 -->
    
    <!-- S 内容区 -->
    <div class="ta-content">
      <ta-table
        :needIndex="true"
        :tableHead="tableHead"
        :keys="tableKeys"
        :tableBody="articles"
        :index="(page - 1) * pageSize">
        <div v-for="(item, i) in articles" :key="i" :slot="i">
          <ta-button size='small' type="primary" @click="editArticle(item._id)">编辑</ta-button>
          <ta-button size='small' type="danger" @click="deleteArticle(item._id)">删除</ta-button>
        </div>
      </ta-table>
    </div>
    <!-- E 内容区 -->

    <!-- S 分页 -->
    <ta-pagination 
      :total="total"
      :page="page"
      @pageChange="handlePageChange($event)"
      @pageSizeChange="handlePageSizeChange($event)"></ta-pagination>
    <!-- E 分页 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import { formatTime } from '@/util/format-time'
import { ArticleProvider } from '@/provider/article-provider'

@Component({
  computed: {
    ...mapState('article', {
      classifies: state => state.classifies,
      states: state => state.states,
    })
  },

  watch: {
    page() {
      this.fetchArticles()
    },

    pageSize() {
      this.fetchArticles()
    },
  },
})
export default class ArticleList extends Vue {
  articles = []              // 文章
  total = 0                  // 总数目
  classify = ''              // 文字分类
  state = ''                 // 文章状态
  keyword = ''               // 搜索关键字
  loading = false            // 是否正在加载中
  tableHead = ['标题', '分类', '作者', '状态', '创建日期', '更新日期', '操作']
  tableKeys = ['title', 'classify', 'author', 'state', 'createdDate', 'updatedDate']
  page = 1                   
  pageSize = 20
  userId = ''

  created() {
    this.userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
    this.$store.dispatch('article/getClassifies')
      .then(_ => this.fetchArticles())
  }

  setClassify(classify) {
    console.log(classify)
    this.classify = classify
  }

  setState(state) {
    console.log(state)
    this.state = state
  }

  handlePageChange(page) {
    this.page = page
  }

  handlePageSizeChange(pageSize) {
    this.pageSize = pageSize
  }

  async search() {
    this.loading = true
    await this.fetchArticles()
    this.loading = false
  }

  async fetchArticles() {
    this.$loading.start()

    try {
      const query = { 
        classify: this.classify, 
        state: this.state,
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize
      }
      const res = await ArticleProvider.fetchArticles(query, this.userId)
      this.articles = res.items.map(item => {
        if (!item.author) {
          return ''
        }

        item.createdDate = formatTime(item.createdDate)
        item.updatedDate = formatTime(item.updatedDate)
        item.author = item.author.account

        item.classify = JSON.parse(JSON.stringify(this.classifies)).find(num => {
          return num.value === item.classify
        }).title
        item.state = JSON.parse(JSON.stringify(this.states)).find(num => {
          return num.value === item.state
        }).title

        return item
      }).filter(item => Boolean(item))
      this.total = res.total
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  async deleteArticle(id) {
    this.$confirm('此操作将删除文章，是否继续？', '提示', { type: 'warning' })
      .then(async () => {
        try {
          const res = await ArticleProvider.deleteArticle(id, this.userId)
          this.$message.success(res)
          this.fetchArticles()
        } catch (err) {
          this.$message.error(err.message)
        }
      })
      .catch(e => this.$message.info('取消删除'))
  }

  editArticle(articleId) {
    this.$router.push(`/article/${articleId}`)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
