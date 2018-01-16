<template>
  <tz-container>
    <tz-button @click="show">click</tz-button>
    <tz-markdown-editor v-model="article"></tz-markdown-editor>
    
  </tz-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TzMarkdownEditor from '@/components/common/markdown-editor'

@Component({
  components: {
    TzMarkdownEditor,
  },
})
export default class Article extends Vue {
  article = '# Test'

  show() {
    console.log(this.article)
  }
}
</script>

<style lang="scss" scoped>
</style>
