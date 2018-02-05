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
          {{ currentPage == 1 ? '1' : (pageSize > total ? total : pageSize * (currentPage - 1)) }}
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
        v-if="paginator < currentPage"
        @click="handlePageChange(paginator)">
        {{ paginator }}
      </span>
      <!-- 当前页 -->
      <span 
        class="is-active" 
        v-if="currentPage <= totalPage">
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
        v-if="currentPage < totalPage" 
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
      default: () => [20, 25, 30],
    },

    total: {
      type: Number,
      default: 182,
    },
  },

  data() {
    return {
      totalPage: 0,
      currentPage: this.$props.page,
      pageSize: 20,
      paginators: [], // 页码选项
    }
  },

  watch: {
    pageSize(newPageSize, oldPageSize) {
      this.setTotalPage(oldPageSize)
    },

    currentPage(page) {
      console.log('page -> ', page)
      this.setPaginators()
      this.$emit('pageChange', page)
    },
  },

  created() {
    this.setTotalPage()
    this.setPaginators()
  },

  methods: {
    setTotalPage(oldPageSize) {
      if (oldPageSize) {
        this.currentPage = Math.ceil((oldPageSize * this.currentPage) / this.pageSize)
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

