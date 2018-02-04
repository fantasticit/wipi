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
          placeholder="标题,描述" v-model="key"></ta-input>
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
      <ta-collapse :noIcon="true" class="ta-content__title">
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
      <div class="ta-content__main">
        <ta-collapse v-for="(article, i) in [...articles, ...articles]" :key="i">
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
      </div>
    </div>
    <!-- E 内容区 -->

    <!-- S 分页 -->
    <ta-pagination></ta-pagination>
    <!-- E 分页 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import { ArticleProvider } from '@/provider/article-provider'

@Component({
  computed: {
    ...mapState('article', {
      classifies: state => ([{ value: '', title: '全部' }]).concat(state.classifies),
      states: state => ([{ value: '', title: '全部' }]).concat(state.states),
    })
  }
})
export default class ArticleList extends Vue {
  classify = ''
  state = ''
  key = ''
  articles = []
  loading = false

  created() {
    this.getArticles()
  }

  setClassify(classify) {
    this.classify = classify
  }

  setState(state) {
    this.state = state
  }

  async search() {
    this.loading = true
    await this.getArticles()
    this.loading = false
  }

  async getArticles() {
    this.$loading.start()

    try {
      const artiles = await ArticleProvider.get()
      this.articles = artiles
      console.log(this.articles)
    } catch (err) {
      this.$message.error(err)
    } finally {
      this.$loading.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@include b(article-list) {
  @include flexLayout(flex-start) {
    flex-direction: column;
  };
}

@include b(searcharea) {
  padding: 0 15px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 22px;

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
  margin-bottom: 22px;

  @include flexLayout(flex-start) {
    flex-direction: column;
  };

  @include e(main) {
    flex: 1;
    overflow: auto;

    td {
      @include textOverflow();
    }

    td.gutter {
      background: #eee;
    }

    @include m(sub) {
      background: #f5f5f5;
      padding: 15px;
    }
  }
}
</style>
