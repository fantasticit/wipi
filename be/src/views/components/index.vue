<template>
  <div>
    <ta-dialog title="弹窗标题" @ok="handleOk" @cancel="handleCancel">
      <p>我是内容</p>
    </ta-dialog>
  </div>
</template>

<script>
export default {
  name: 'Components'
}
</script>
