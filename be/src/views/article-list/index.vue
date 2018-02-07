<template>
  <div class="ta-article-list">
    <!-- S 搜索区 -->
    <div class="ta-searcharea">
      <div class="ta-searcharea__item">
        <span>分类:</span>
        <ta-button 
          v-for="(item, i) in classifies"
          :key="i"
          :type="item.value === classify ? 'primary' : 'text'"
          @click="setClassify(item.value)">
          {{ item.title }}
        </ta-button>
      </div>

      <div class="ta-searcharea__item">
        <span>状态:</span>
        <ta-button 
          v-for="(item, i) in states"
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
        v-if="articles.length > 0"
        :tableHead="tableHead"
        :keys="tableKeys"
        :tableBody="articles"
        :index="(page - 1) * pageSize">
        <div v-for="(item, i) in articles" :key="i" :slot="i">
          <ta-button size='small' type="primary">编辑</ta-button>
          <ta-button size='small' type="danger" @click="deleteArticle(item._id)">删除</ta-button>
        </div>
      </ta-table>
      <p v-else>暂无结果</p>
      <!-- <ta-collapse :noIcon="true" class="ta-content__title">
        <table slot="title">
          <tr>
            <td width="80">编号</td>
            <td>标题</td>
            <td>分类</td>
            <td>状态</td>
            <td>创建日期</td>
            <td>操作</td>
          </tr>
        </table>
      </ta-collapse>
      <div class="ta-content__main" ref="content">
        <ta-collapse v-for="(article, i) in articles" :key="i">
          <table slot="title">
            <tr>
              <td width="80">{{ i + 1 }}</td>
              <td>{{ article.title }}</td>
              <td>{{ article.classify }}</td>
              <td>{{ article.state || '未设定' }}</td>
              <td>{{ article.date }}</td>
              <td>
                <ta-button size='small' type="primary">编辑</ta-button>
                <ta-button size='small' type="danger">删除</ta-button>
              </td>
            </tr>
          </table>

          <div class="ta-content__main--sub">
            <p>
              <span>作者:</span>
              <span>{{ article.author }}</span>
            </p>
            <p>
              <span>概述:</span>
              <span>{{ article.desc || '未设定' }}</span>
            </p>
            <p>
              <span>标签:</span>
              <span>{{ article.tags.join('、') }}</span>
            </p>
          </div>
        </ta-collapse>
      </div> -->
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
import { on } from '@/util/event'
import { ArticleProvider } from '@/provider/article-provider'

@Component({
  computed: {
    ...mapState('article', {
      classifies: state => ([{ value: '', title: '全部' }]).concat(state.classifies),
      states: state => ([{ value: '', title: '全部' }]).concat(state.states),
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
  tableHead = ['编号', '标题', '分类', '状态', '创建日期', '操作']
  tableKeys = ['', 'title', 'classify', 'state', 'createDate']
  page = 1                   
  pageSize = 20

  created() {
    this.fetchArticles()
  }

  setClassify(classify) {
    this.classify = classify
  }

  setState(state) {
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
      const res = await ArticleProvider.fetchArticles(query)
      this.articles = res.items
      this.total = res.total
    } catch (err) {
      this.$message.error(err)
    } finally {
      this.$loading.close()
    }
  }

  async deleteArticle(id) {
    this.$confirm('此操作将删除文章，是否继续？', '提示', {})
      .then(async () => {
        try {
          const res = await ArticleProvider.deleteArticle(id)
          this.$message.success(res)
          this.fetchArticles()
        } catch (err) {
          this.$message.error(err)
        }
      })
      .catch(e => this.$message.info('取消删除'))
  }
}
</script>

<style lang="scss" scoped>
@mixin common() {
  padding: 0 15px;
  background: #fff;
  border-radius: 2px;
  margin-bottom: 22px;
}

@include b(article-list) {
  @include flexLayout(flex-start) {
    flex-direction: column;
  };
}

@include b(searcharea) {
  @include common;

  @include e(item) {
    padding: 10px 0;
    border-bottom: 1px dashed $border;

    &:last-of-type {
      border-bottom: 0;
    }

    span {
      margin-right: 1em;
    }

    button + button {
      margin-left: 10px;
    }
  }
}

@include b(content) {
  flex: 1;
  @include common;
  padding: 15px;

  @include flexLayout(flex-start) {
    flex-direction: column;
  };

  @include e(main) {
    flex: 1;
    overflow: auto;

    td {
      @include textOverflow();
    }

    @include m(sub) {
      background: #f5f5f5;
      padding: 15px;
    }
  }
}
</style>
