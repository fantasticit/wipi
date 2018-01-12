<template>
  <div class="fa-form-item" ref="formItem">
    <input
      class="el-input__inner"
      :class="{ 'is-invalid': showInvalidTip }"
      :type="type" :placeholder="placeholder"
      :required="required"
      v-model="currentValue" @change="emitInput()"
    >
    <transition name="slide-down">
      <p
        class="fa-form-item__invalid-tip"
        v-if="showInvalidTip">
        {{ invalidTip }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FaFormItem',
  props: {
    value: { type: String, default: '' },
    type: { type: String, default: 'text' },
    trigger: { type: String, default: 'input' },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: '请输入信息' },
    invalidTip: { type: String, default: '该项不通过' },
  },
  mounted() {
    this.$refs['formItem'].querySelector('input').addEventListener(this.trigger, this.validate, false)
  },
  data() {
    return {
      currentValue: this.$props.value,
      showInvalidTip: false,
    }
  },
  methods: {
    emitInput() {
      this.$emit('input', this.currentValue)
    },
    validate() {
      if (this.required && !this.currentValue) {
        this.showInvalidTip = true
      } else {
        this.showInvalidTip = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@include b(form-item) {
  height: 40px;
  margin-bottom: 22px;
  position: relative;

  @include when(invalid) {
    border-color: $danger;
  }

  @include e(invalid-tip) {
    position: absolute;
    margin: 0 0 0 4px;
    padding-top: 4px;
    font-size: 12px;
    color: $danger;
  }
}

.slide-down-enter-active {
  animation: enter ease .3s;
}

.slide-down-leave-active {
  animation: leave ease .3s;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>
