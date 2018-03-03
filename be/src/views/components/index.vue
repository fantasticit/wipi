<template>
  <div class="ta-page">
    <ta-alert>这里为模仿ElementUI开发的组件(我是Alert组件)</ta-alert>
    <br>
    <ta-button @click="showDialog = true">点击打开弹窗</ta-button>
    <ta-dialog 
      v-if="showDialog"
      title="弹窗标题"
      :width="500"
      @ok="showDialog = false" 
      @cancel="showDialog = false">
      <p>我是内容</p>
    </ta-dialog>

    <ta-button @click="showConfirm" type="info">点我展示confirm和message</ta-button>
    <ta-button :loading="true" type="primary">loading</ta-button>
    <ta-button type="warning" @click="showLoading">点我展示loding</ta-button>
    <ta-button type="text" @click="showNotification">点我展示notification</ta-button>

    <br>
    <div class="ta-page__box">
      <p>上传组件</p>
      <ta-upload></ta-upload>
    </div>

    <div class="ta-page__box">
      <p>collapse组件</p>
      <ta-collapse>
        <div slot="title">collapse 标题</div>
        <div style="background: #eee">
          我是内容我是内容我是内容我是内容
        </div>
      </ta-collapse>
    </div>

    <div class="ta-page__box">
      <p>分页组件</p>
      <ta-pagination :total="400"></ta-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Components',

  data() {
    return {
      showDialog: false
    }
  },

  methods: {
    showConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {})
      .then(({value}) => this.$message.info('您点击了确认'))
      .catch(e => this.$message.error('您点击了取消'))
    },

    showLoading() {
      this.$loading.start()
      this.$message.info('3s后关闭')

      setTimeout(() => {
        console.log('关闭')
        this.$loading.close()
      }, 3000)
    },

    showNotification() {
      this.$notify.success('你好')
      this.$notify.warning('我好')
      this.$notify.error('老王不好')
    }
  }
}
</script>

<style lang="scss" scoped>
@include b(page) {
  background: #fff;
  padding: 15px;

  @include e(box) {
    box-sizing: border-box;
    padding: 15px;

    margin-top: 15px;
    border: 1px solid #ccc;

    p {
      padding: .5em 0;
    }
  }
}
</style>
