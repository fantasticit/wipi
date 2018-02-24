<template>
  <div class="ta-page">
    <!-- S 内容区 -->
    <div class="ta-page__content">
      <ta-table
        :needIndex="true"
        :tableHead="tableHead"
        :keys="tableKeys"
        :tableBody="users"
        :index="(page - 1) * pageSize">
        <div v-for="(item, i) in users" :key="i" :slot="i">
          <ta-button size='small' type="danger" @click="deleteUser(item._id)">删除</ta-button>
        </div>
      </ta-table>
    </div>
    <!-- E 内容区 -->

    <!-- S 分页 -->
    <ta-pagination 
      :total="total"
      :page="page"
      @pageChange="handlePageChange($event)"
      @pageSizeChange="handlePageSizeChange($event)"></ta-pagination>
    <!-- E 分页 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Loadingbar } from '@/components/common/loadingbar'
import { UserProvider } from '@/provider/user-provider'
import { formatTime } from '@/util/format-time'

@Component({
  beforeRouteEnter(to, from, next) {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const roles = userInfo.roles

    if (roles.indexOf('admin') > -1) {
      next()
    } else {
      Loadingbar.finish()
      next('/forbidden')
    }
  },

  watch: {
    page() {
      this.fetchUsers()
    },

    pageSize() {
      this.fetchUsers()
    },
  },
})
export default class UserManagement extends Vue {
  userId = ''
  users = []
  total = 0
  page = 1
  pageSize = 20
  tableHead = ['Id','账户', '角色', '注册日期', '上次登录时间', '操作']
  tableKeys = ['_id', 'account', 'roles', 'createdTime', 'lastLoginTime']

  created() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.userId = userInfo.id
    this.fetchUsers()
  }

  async fetchUsers() {
    this.$loading.start()

    try {
      const res = await UserProvider.getUsers({
        userId: this.userId,
        page: this.page,
        pageSize: this.pageSize
      })

      console.log(res)

      this.users = res.items.map(user => {
        user.roles = user.roles.join('、')
        user.lastLoginTime = formatTime(user.lastLoginTime) 
        user.createdTime = formatTime(user.createdTime) 

        return user
      })
      this.total = res.total      
    } catch (err) {
      this.$message.error(err.message)
    } finally {
      this.$loading.close()
    }
  }

  async deleteUser(deletedUserId) {
    this.$confirm('删除用户后无法恢复，是否继续？', '提示', {type: 'warning'})
      .then(async () => {
        const res = await UserProvider.deleteUser(this.userId, deletedUserId)
        this.$message.success(res)
        this.fetchUsers()
      })
      .catch(e => {
        console.log(e)
        this.$message.info('删除失败')
      })
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

  @include e(content) {
    flex: 1;
    background: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
}
</style>
