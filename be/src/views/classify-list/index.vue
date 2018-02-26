<template>
  <div class="ta-page">
    <ta-table 
      :tableHead="tableHead"
      :tableBody="classifies"
      :keys="keys"
      :needIndex="true">
      <div v-for="(classify, i) in classifies" :key="i" :slot="i">
        <ta-button 
          type="primary" 
          size="small" 
          @click="editClassify(classify._id)">
          编辑
        </ta-button>
        <ta-button 
          type="danger" 
          size="small" 
          @click="deleteClassify(classify._id)">
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
import { ClassifyProvider } from '@/provider/classify-provider'

@Component({})
export default class ClassifyList extends Vue {
  tableHead = ['标签名', '标签值', '创建日期', '更新日期', '操作']
  keys = ['title', 'value', 'createdDate', 'updatedDate']
  classifies = []
  userId = ''

  created() {
    this.userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
    this.fetchClassifies()
  }

  async fetchClassifies() {
    this.$loading.start()

    try {
      const res = await ClassifyProvider.getClassifies()
      this.classifies = res.map(classify => {
        classify.createdDate = formatTime(classify.createdDate)
        classify.updatedDate = formatTime(classify.updatedDate)

        return classify
      })
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  editClassify(id) {
    this.$router.push(`/classify/${id}`)
  }

  async deleteClassify(id) {
    this.$confirm('此操作将删除标签，是否继续？', '删除标签', {})
      .then(async () => await ClassifyProvider.deleteClassify(id, this.userId))
      .then(msg => {
        this.$message.success(msg)
        this.fetchClassifies()
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
