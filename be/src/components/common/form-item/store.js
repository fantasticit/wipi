class _Store {
  constructor() {
    this.validators = new Map()
  }
  
  set(key, value) {
    this.validators.set(key, value)
  }

  get(key) {
    return this.validators.get(key)
  }
}

const Store = new _Store()

export default Store
