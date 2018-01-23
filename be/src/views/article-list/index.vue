<template>
  <ta-container>
    <pre>{{ articles }}</pre>
  </ta-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { ArticleProvider } from '@/provider/article-provider'

@Component({
})
export default class ArticleList extends Vue {
  articles = []

  created() {
    this.getArticles()
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

</style>
