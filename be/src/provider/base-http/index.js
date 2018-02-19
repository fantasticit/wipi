import axios from './config'

class BaseHttp {
  http = axios
  constructor() {}

  apiResolve(key) {
    return this.api.basic + this.api[key]
  }
}

export default BaseHttp
