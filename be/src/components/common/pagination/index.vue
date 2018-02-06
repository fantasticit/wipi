<template>
  <div class="ta-pagination">
    <div class="ta-pagination__info">
      <span>显示</span>
      <select class="ta-select" v-model="pageSize">
        <option 
          v-for="(pageSize, index) in pageSizes" 
          :key="index" 
          :value="pageSize">
          {{ pageSize }}
        </option>
      </select>
      <span>
        条记录，
        当前显示
          {{ 
            currentPage == 1 
            ? '1' 
            : (pageSize > total 
              ? total 
              : pageSize * (currentPage - 1) > total 
                ? total
                : pageSize * (currentPage - 1)) 
          }}
        到
          {{ total > currentPage * pageSize ? currentPage * pageSize : total }}
        条，
        共{{ total }}条记录
      </span>
    </div>

    <div class="ta-pagination__paginator">
      <!-- 上一页 -->
      <span 
        @click="decrementPage()" 
        :class="{ 'is-disabled': currentPage === 1 }">
        <ta-icon name="ios-arrow-back"></ta-icon>
      </span>
      <!-- 前置页码 -->
      <span 
        v-for="(paginator, i) in paginators" :key="i"
        v-if="paginator > 0 && paginator < currentPage"
        @click="handlePageChange(paginator)">
        {{ paginator }}
      </span>
      <!-- 当前页 -->
      <span 
        class="is-active">
        {{ currentPage }}
      </span>
      <!-- 后置页码 -->
      <span 
        v-for="(paginator, i) in paginators" :key="i"
        v-if="paginator > currentPage && paginator < totalPage"
        @click="handlePageChange(paginator)">
        {{ paginator }}
      </span>
      <!-- 最后一页 -->
      <span 
        v-if="currentPage != totalPage && totalPage > 0" 
        @click="handlePageChange(totalPage)">
        {{ totalPage }}
      </span>
      <!-- 下一页 -->
      <span 
        @click="incrementPage()" 
        :class="{ 'is-disabled': currentPage === totalPage || totalPage < 1 }">
        <ta-icon name="ios-arrow-forward"></ta-icon>
      </span>
    </div>
  </div>
</template>

<script>
import TaIcon from '../icon'

export default {
  name: 'TaPagination',

  components: {
    TaIcon,
  },

  props: {
    page: {
      type: Number,
      default: 1,
    },

    pageSizes: {
      type: Array,
      default: () => [7, 10, 15, 20, 25, 30, 35],
    },

    total: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      totalPage: 0,
      currentPage: this.page,
      pageSize: 20,
      paginators: [], // 页码选项
    }
  },

  watch: {
    pageSize(newPageSize, oldPageSize) {
      this.setTotalPage(newPageSize, oldPageSize)
      this.setPaginators()
      this.$emit('pageSizeChange', newPageSize)
    },

    currentPage(page) {
      this.setPaginators()
      this.$emit('pageChange', page)
    },

    total() {
      this.setTotalPage()
    },

    totalPage() {
      this.setPaginators()
    },
  },

  created() {
    this.setTotalPage()
    this.setPaginators()
  },

  methods: {
    setTotalPage(newPageSize, oldPageSize) {
      if (oldPageSize) {
        this.currentPage = ~~((oldPageSize * (this.currentPage - 1)) / newPageSize)
      }

      this.totalPage = Math.ceil(this.total / this.pageSize)
    },

    setPaginators() {
      let count = 3
      let num1 = this.currentPage
      let num2 = num1
      this.paginators = []

      while (count > 0) {
        num1 > 1 && this.paginators.unshift(--num1)
        num2 < this.totalPage && this.paginators.push(++num2)
        --count
      }

      this.paginators = [...new Set(this.paginators)]
    },

    handlePageChange(page) {
      this.currentPage = page
    },

    decrementPage() {
      if (this.currentPage > 1 && this.currentPage <= this.totalPage) {
        this.currentPage--
      }
    },

    incrementPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++
      }
    },
  },
}
</script>

