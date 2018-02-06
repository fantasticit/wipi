<template>
  <div 
    class="ta-table" 
    :class="{'is-bottom-border': showGutter}">
    <div class="ta-table__head">
      <table>
        <tbody>
          <tr>
            <td 
              v-for="(head, i) in tableHead" :key="i"
              :width="i === 0 ? 60 : ''">
              {{ head }}
            </td>
            <td v-if="showGutter" class="gutter" width="14"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div 
      class="ta-table__body" 
      ref="tableBody" 
      :class="{'is-no-bottom-border': showGutter}">
      <table ref="table">
        <tbody>
          <tr v-for="(body, i) in tableBody" :key="i">
            <td v-for="(key, j) in keys" :key="j" :width="!key ? 60 : ''">
              {{ !key ? index + i + 1 : body[key] }}
            </td>
            <td v-if="keys.length < tableHead.length">
              <slot :name="i"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaTable',

  props: {
    keys: {
      type: Array,
      default: () => []
    },

    tableHead: {
      type: Array,
      default: () => []
    },

    tableBody: {
      type: Array,
      default: () => []
    },

    index: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {
      showGutter: false
    }
  },

  mounted() {
    this.calculateHeight()
  },

  updated() {
    this.calculateHeight()
  },

  methods: {
    calculateHeight() {
      const totalHeight = this.$refs['tableBody'].offsetHeight
      const tableHeight = this.$refs['table'].offsetHeight

      if (tableHeight > totalHeight) {
        this.showGutter = true
      } else {
        this.showGutter = false
      }
    }
  },
}
</script>
