<template>
  <div id="app">
    <router-view></router-view>

    <!-- <div class="pagination">
      <div>
        <span>显示</span>
        <select v-model="pageSize">
          <option v-for="(pageSize, index) in pageSizes" :key="index" :value="pageSize">{{ pageSize }}</option>
        </select>
        <span>条记录，</span>
        <span>当前显示{{ users.length > 0 ? userIndex + 1 : 0}}到{{ page > 1 ? users.length + (page - 1) * pageSize : (users.length) }}条，</span>
        <span>共{{ total }}条记录</span>
      </div>

      <div>
        <span @click="setPage('-')" :class="{ disabled: page === 1 }">上一页</span>

        <span v-if="page - 3 > 0" @click="setPage(page - 3)">{{ page - 3 }}</span>
        <span v-if="page - 2 > 0" @click="setPage(page - 2)">{{ page - 2 }}</span>
        <span v-if="page - 1 > 0" @click="setPage(page - 1)">{{ page - 1 }}</span>

        <span class="active" v-if="page <= totalPage">{{ page }}</span>

        <span v-if="page + 1 < totalPage" @click="setPage(page + 1)">{{ page + 1 }}</span>
        <span v-if="page + 2 < totalPage" @click="setPage(page + 2)">{{ page + 2 }}</span>
        <span v-if="page + 3 < totalPage" @click="setPage(page + 3)">{{ page + 3 }}</span>

        <span v-if="page < totalPage" @click="setPage(totalPage)">{{ totalPage }}</span>

        <span @click="setPage('+')" :class="{ disabled: page === totalPage || totalPage < 1 }">下一页</span>
      </div>
    </div> -->


  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
