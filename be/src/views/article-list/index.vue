<template>
  <div>
    <!-- S 搜索区 -->
    <div class="ta-searcharea">
      <div class="ta-searcharea__item">
        <span>分类:</span>
        <ta-button 
          v-for="(item, i) in classifies"
          :key="i"
          :type="item.value === classify ? 'info' : 'text'"
          @click="setClassify(item.value)">
          {{ item.title }}
        </ta-button>
      </div>

      <div class="ta-searcharea__item">
        <span>状态:</span>
        <ta-button 
          v-for="(item, i) in states"
          :key="i"
          :type="item.value === state ? 'info' : 'text'"
          @click="setState(item.value)">
          {{ item.title }}
        </ta-button>
      </div>

      <div class="ta-searcharea__item">
        <span>搜索:</span>
        <ta-input 
          placeholder="标题,描述" v-model="key"></ta-input>
        <ta-button 
          type="info" 
          icon="ios-search-strong"
          :loading="loading"
          @click="search()">
          搜索
        </ta-button>
      </div>
    </div>
    <!-- E 搜索区 -->
    <ta-collapse>
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </ta-collapse>
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
      this.articles =artiles
    } catch (err) {
      this.$message.error(err)
    } finally {
      this.$loading.close()
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
