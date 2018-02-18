<template>
  <transition name="slide-down-dialog">
    <div class="ta-dialog__wrapper" v-if="isShow">
      <div class="ta-dialog" :style="{ width: width > 0 ? width + 'px' : '100%'}">
        <div class="ta-dialog__header">
          <span>{{ title }}</span>
          <ta-icon name="ios-close-empty" @click="handleCancel()"></ta-icon>
        </div>
        <div class="ta-dialog__body">
          <slot></slot>
        </div>
        <div class="ta-dialog__footer" v-if="showFooter">
          <ta-button @click="handleCancel()">取消</ta-button>
          <ta-button type="primary" :loading="loading" @click="handleOk()">确定</ta-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TaIcon from '../icon'
import TaButton from '../button'

export default {
  name: 'TaDialog',

  components: {
    TaIcon,
    TaButton
  },

  props: {
    title: {
      type: String,
      default: '标题'
    },

    loading: {
      type: Boolean,
      default: false
    },

    showFooter: {
      type: Boolean,
      default: true
    },

    width: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      isShow: true
    }
  },

  methods: {
    handleCancel() {
      this.isShow = false
      this.$emit('cancel')
    },

    handleOk() {
      this.isShow = true
      this.$emit('ok')
    },
  },
}
</script>
