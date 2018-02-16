<template>
  <div class="ta-page">
    <div class="ta-page__search">
      <ta-input 
        @focus="isFocus = true"
        @blur="isFocus = false"  
        placeholder="请输入关键词（url, method），回车以搜索" 
        v-model="keyword"
        @enter="search()">
      </ta-input>
    </div>

    <div class="ta-page__content">
      <ta-table
        :tableHead="tableHead"
        :tableBody="logs"
        :needIndex="true"
        :index="pageSize * (page - 1)"
        :keys="tableKeys">
        <div v-for="(item, i) in logs" :key="i" :slot="i">
          <ta-button size='small' @click="checkLog(item)">详情</ta-button>
        </div>
      </ta-table>
    </div>

    <!-- S 分页 -->
    <ta-pagination 
      :total="total"
      :page="page"
      @pageChange="handlePageChange($event)"
      @pageSizeChange="handlePageSizeChange($event)"></ta-pagination>
    <!-- E 分页 -->

    <ta-dialog
      title="错误详情"
      :showFooter="false"
      v-if="showDialog" @cancel="showDialog = false">
      <table>
        <tbody>
          <tr v-for="(key, i) in Object.keys(selectedLog)" :key="i">
            <td width="100">{{ key }}</td>
            <td>{{ selectedLog[key] }}</td>
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
      this.fetchApiErrorLog()
    },

    pageSize() {
      this.fetchApiErrorLog()
    },
  }
})
export default class ApiError extends Vue {
  logs = []
  selectedLog = ''
  tableHead = ['请求地址', 'Http动作', '响应码', '日期', '操作']
  tableKeys = ['requestUrl', 'method', 'statusCode', 'dateTime']
  total = 0
  keyword = ''
  page = 1
  pageSize = 20
  showDialog = false

  created() {
    this.fetchApiErrorLog()
  }

  async fetchApiErrorLog() {
    this.$loading.start()
    try {
      const res = await ReportProvider.getApiErrorLog({
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword
      })
      this.logs = res.items.map(log => {
        delete log._id
        delete log.__v
        delete log.responseTime
        log.dateTime = formatTime(log.dateTime)
        return log
      })
      this.total = res.total
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  checkLog(log) {
    this.selectedLog = log
    this.showDialog = true
  }

  search() {
    this.page = 1
    this.fetchApiErrorLog()
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
    @include flexLayout();
    margin-bottom: 15px;

    .ta-input {
      width: 100%;
      border-radius: 0;
    }
  }

  @include e(content) {
    flex: 1;
    margin-bottom: 15px;
    overflow: auto;
    box-sizing: border-box;
    background: #fff;
    padding: 15px;
    border: 1px solid transparent;
    @include flexLayout(flex-start) {
      flex-direction: column;
    }

    .head {
      height: 50px;
    }

    .body {
      flex: 1;
      overflow: auto;
    }
  }

  /deep/ .ta-dialog__body table {
    width: 100%;

    tr {
      &:hover {
        background: #f7f5fa;
      }
    }

    td {
      padding: 10px;
      border: 1px solid $border;
    }
  }

  @include e(collapse-content) {
    li {
      @include flexLayout() {
        align-items: center;
      }

      span {
        &:first-of-type {
          width: 8em;
        }

        &:last-of-type {
          flex: 1;
        }
      }
    }
  }
}
</style>
