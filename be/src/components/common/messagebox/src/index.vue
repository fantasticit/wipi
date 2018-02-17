<template>
  <transition name="slide-down-dialog">
    <div class="ta-dialog__wrapper" v-if="visible">
      <div class="ta-dialog ta-dialog--messagebox">
        <div class="ta-dialog__header">
          <span>{{ title }}</span>
          <ta-icon name="ios-close-empty" @click="onCancel()"></ta-icon>
        </div>
        <div class="ta-dialog__body">
          <div v-if="showInput">
            <p>{{ tip }}</p>
            <ta-form-item
              :rules="rules"
              @success="pass"
              @fail="fail"
              ref="input"
              :focus="true"
              :placeholder="tip"
              v-model="inputValue">
            </ta-form-item>
          </div>
          <template v-else>
            <ta-icon :name="iconName" :class="'ta-icon--' + type"></ta-icon>
            <span>{{ tip }}</span>
          </template>
        </div>
        <div class="ta-dialog__footer">
          <ta-button size="small" @click="onCancel()">
            {{ cancelButtonText }}
          </ta-button>
          <ta-button type="primary" size="small" @click="onConfirm()">
            {{ confirmButtonText }}
          </ta-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TaIcon from '../../icon'
import TaButton from '../../button'
import TaFormItem from '../../form-item'

export default {
  name: 'TaDialog',

  components: {
    TaIcon,
    TaButton,
    TaFormItem,
  },

  props: {
    title: {
      type: String,
      default: '标题'
    },

    confirmButtonText: {
      type: String,
      default: '确定'
    },

    cancelButtonText: {
      type: String,
      default: '取消'
    },

    showInput: {
      type: Boolean,
      default: false
    },

    tip: {
      type: String,
      default: '提示'
    },

    type: {
      type: String,
      default: 'success'
    },

    rules: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      visible: false,
      inputValue: '',
      passed: false,
    }
  },

  computed: {
    iconName() {
      switch (this.type) {
        case 'success':
          return 'checkmark-circled'
        
        case 'error':
          return 'close-circled'
        
        default:
          return 'information-circled'
      }
    }
  },

  mounted() {
    // if (this.showInput) {
    //   console.log(this.$refs)
    //   // this.$refs['input']

    //   this.$refs['input'].$el.querySelector('input').setAttribute('autofocus', true)
    // }
  },

  methods: {
    onCancel() {
      this.visible = false
      this.callback && (this.callback.call(this, 'cancel'))
    },

    onConfirm() {
      if (this.showInput && !this.passed) {
        return
      } else {
        this.visible = false
        this.callback && (this.callback.call(this, 'confirm'))
      }
    },

    pass() {
      this.passed = true
    },

    fail() {
      this.passed = false
    },
  },
}
</script>
