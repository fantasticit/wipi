<template>
  <div class="ta-page">
    <div class="ta-page__search" :class="{ 'is-active': isFocus }">
      <ta-select 
        @focus="isFocus = true" 
        @blur="isFocus = false" 
        :options="projects" 
        v-model="selectedProject">
      </ta-select>
      <ta-input 
        @focus="isFocus = true"
        @blur="isFocus = false"  
        placeholder="请输入页面路径后回车以搜索" 
        v-model="keyword"
        @enter="fetchFeErrors()">
      </ta-input>
    </div>

    <div class="ta-page__content">
      <ta-table
        :tableHead="tableHead"
        :tableBody="errors"
        :needIndex="true"
        :index="pageSize * (page - 1)"
        :keys="tableKeys">
        <div v-for="(item, i) in errors" :key="i" :slot="i">
          <ta-button size='small' @click="checkError(item)">详情</ta-button>
        </div>
      </ta-table>
    </div>

    <!-- S 分页 -->
    <ta-pagination 
      :total="total"
      :page="page"
      @pageChange="handlePageChange($event)"
      @pageSizeChange="handlePageSizeChange($event)">
    </ta-pagination>
    <!-- E 分页 -->

    <ta-dialog
      title="错误详情"
      :showFooter="false"
      v-if="showDialog" @cancel="showDialog = false">
      <table>
        <tbody>
          <tr v-for="(key, i) in Object.keys(selectedError)" :key="i">
            <td>{{ key }}</td>
            <td>{{ selectedError[key] }}</td>
          </tr>
        </tbody>
      </table>
    </ta-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { formatTime } from '@/util/format-time'
import { ReportProvider } from '@/provider/report-provider'

@Component({
  watch: {
    page() {
      this.fetchFeErrors()
    },

    pageSize() {
      this.fetchFeErrors()
    },
  }
})
export default class ApiError extends Vue {
  errors = []
  selectedError = {}
  tableHead = ['页面路由', '信息', '日期', '操作']
  tableKeys = ['vm', 'errMsg', 'dateTime']
  page = 1
  pageSize = 20
  projects = [
    { title: 'Elapse-Admin', value: 'Elapse-Admin' },
    { title: 'Elapse-Front', value: 'Elapse-Front' },
  ]
  selectedProject = 'Elapse-Admin'
  keyword = ""
  isFocus = false
  showDialog = false
  total = 0

  created() {
    this.fetchFeErrors()
  }

  async fetchFeErrors() {
    this.$loading.start()
    try {
      const res = await ReportProvider.getFeErrors({
        appName: this.selectedProject,
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize
      })
      this.errors = res.items.map(error => {
        delete error._id
        delete error.__v
        error.dateTime = formatTime(error.dateTime)
        return error
      })
      this.total = res.total
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  checkError(error) {
    this.showDialog = true
    this.selectedError = error
  }

  handlePageChange(page) {
    this.page = page
  }

  handlePageSizeChange(pageSize) {
    this.pageSize = pageSize
  }
}
</script>

<style lang="scss" scoped>
@include b(page) {
  @include flexLayout(flex-start) {
    flex-direction: column;
  }

  @include e(search) {
    border: 1px solid transparent;
    @include flexLayout();
    margin-bottom: 15px;

    transition: all ease .2s;

    @include when(active) {
      border-color: $primary;
    }

    /deep/ .ta-select__container {
      width: 120px;
      border-radius: 0;
      
      select {
        border-color: transparent !important; 
      }
    }

    .ta-input {
      flex: 1;
      border-radius: 0;
      border-left: 0;
      border: 0 !important; 
    }
  }

  @include e(content) {
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
    background: #fff;
    padding: 15px;
    margin-bottom: 15px;
  }
}
</style>
