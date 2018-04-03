<template>
  <div class="ta-page">
    <ta-table 
      :tableHead="tableHead"
      :tableBody="tags"
      :keys="keys"
      :needIndex="true">
      <div v-for="(tag, i) in tags" :key="i" :slot="i">
        <ta-button 
          type="primary" 
          size="small" 
          @click="editTag(tag._id)">
          编辑
        </ta-button>
        <ta-button 
          type="danger" 
          size="small" 
          @click="deleteTag(tag._id)">
          删除
        </ta-button>
      </div>
    </ta-table>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatTime } from '@/util/format-time'
import { TagProvider } from '@/provider/tag-provider'

@Component({
})
export default class TagList extends Vue {
  tableHead = ['标签名', '标签值', '创建日期', '更新日期', '操作']
  keys = ['title', 'value', 'createAt', 'updateAt']
  tags = []

  created() {
    this.fetchTags()
  }

  async fetchTags() {
    this.$loading.start()

    try {
      const res = await TagProvider.getTags()

      this.tags = res.map(tag => {
        tag.createAt = formatTime(tag.createAt)
        tag.updateAt = formatTime(tag.updateAt)

        return tag
      })
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  editTag(id) {
    this.$router.push(`/tag/${id}`)
  }

  async deleteTag(id) {
    this.$confirm('此操作将删除标签，是否继续？', '删除标签', { type: 'warning' })
      .then(async () => await TagProvider.deleteTag(id))
      .then(msg => {
        this.$message.success(msg)
        this.fetchTags()
      })
      .catch(e => this.$message.error(e.message || '取消删除'))
  }
}
</script>

<style lang="scss" scoped>
@include b(page) {
  padding: 15px;
  background: #fff;
}
</style>
