<template>
  <div>
    <ta-collapse>
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </ta-collapse>
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
