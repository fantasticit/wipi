function find(parent, target) {
  return parent.$children.some(child => {
    return child === target
  })
}

export default {
  methods: {
    dispatch(trigger, [vm]) {
      let $parent = this.$parent
    
      while ($parent && !find($parent, vm)) {
        $parent = $parent.$parent
      }
      
      $parent.$emit(trigger, vm)
    }
  }
}
