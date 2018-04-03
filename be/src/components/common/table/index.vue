<template>
  <div 
    class="ta-table" 
    :class="{'is-bottom-border': showGutter && tableBody.length > 0}">
    <div class="ta-table__head">
      <table>
        <tbody>
          <tr>
            <td v-if="needIndex" width="60">编号</td>
            <td 
              v-for="(head, i) in tableHead" :key="i"
              >
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
      <table ref="table" v-if="tableBody.length > 0">
        <tbody>
          <tr v-for="(body, i) in tableBody" :key="i">
            <td v-if="needIndex" width="60">{{ index + i + 1 }}</td>  
            <td v-for="(key, j) in keys" :key="'k' + i + j">
              {{
                [].concat(key).reduce((_, subKey) => _ && _[subKey], body)
              }}
            </td>
            <td>
              <slot :name="i"></slot>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>暂无数据</p>
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

    needIndex: {
      type: Boolean,
      default: false
    }
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
      const totalHeight = this.$refs['tableBody'] 
                          && this.$refs['tableBody'].offsetHeight
                          || 0
      const tableHeight = this.$refs['table'] 
                          && this.$refs['table'].offsetHeight
                          || 0

      if (tableHeight > totalHeight) {
        this.showGutter = true
      } else {
        this.showGutter = false
      }
    }
  },
}
</script>
