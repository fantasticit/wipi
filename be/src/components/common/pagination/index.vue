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
            ? (total > 0 ? 1 : 0)
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
        v-for="(paginator, i) in [currentPage - 3, currentPage - 2, currentPage - 1]" :key="'pre' + i"
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
        v-for="(paginator, i) in [currentPage + 1, currentPage + 2, currentPage + 3]" :key="'las' + i"
        v-if="paginator > 1 && paginator > currentPage && paginator < totalPage"
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
      default: () => [20, 25, 30, 35],
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
    }
  },

  watch: {
    pageSize(newPageSize, oldPageSize) {
      this.setTotalPage(newPageSize, oldPageSize)
      this.$emit('pageSizeChange', newPageSize)
    },

    currentPage(page) {
      page = page > 0 ? page : 1
      this.currentPage = page
      this.$emit('pageChange', page)
    },

    total() {
      this.setTotalPage()
    }
  },

  created() {
    this.setTotalPage()
  },

  methods: {
    setTotalPage(newPageSize, oldPageSize) {
      if (oldPageSize) {
        this.currentPage = ~~((oldPageSize * (this.currentPage - 1)) / newPageSize)
        this.currentPage = this.currentPage > 0 ? this.currentPage : 1
      }

      this.totalPage = Math.ceil(this.total / this.pageSize)
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

