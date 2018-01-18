<template>
  <div class="ta-mdeditor">
    <textarea ref="mdEditor"></textarea>
  </div>
</template>

<script>
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'

export default {
  name: 'TaMarkdownEditor',

  props: {
    value: String,
  },

  data() {
    return {
      mdEditor: null,
      hasChange: false,
    }
  },

  mounted() {
    this.mdEditor = new SimpleMDE({
      element: this.$refs['mdEditor']
    })
    if (this.value) {
      this.mdEditor.value(this.value)
    }
    this.mdEditor.codemirror.on('change', () => {
      // this.hasChange = true
      this.$emit('input', this.mdEditor.value())
    })
  },

  destroyed() {
    this.mdEditor = null
  },
}
</script>
