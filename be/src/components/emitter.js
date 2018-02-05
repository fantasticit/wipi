function find(parent) {
  console.log(this._uid)
  return parent.$children.find(child => {
    console.log(child)
    child._uid = this._uid
  })
}

export default {
  methods: {
    dispatch(parent, trigger, params) {
      let $parent = this.$parent
      let finder = find.bind(this)

      console.log(finder($parent))

      while (!finder($parent)) {
        $parent = $parent.$parent
      }
      
      console.log($parent)
    }
  }
}
