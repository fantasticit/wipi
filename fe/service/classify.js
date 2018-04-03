import axios from './config'

class ClassifyService {
  static constructor() {}

  // 获取文章标签
  static async fetchClassify() {
    const req = { url: '/classify', method: 'get' }

    try {
      const res = await axios(req)
      
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 根据标签值获取整个标签
  static async fetchClassifyByValue(val) {
    const req = { url: `/classify?conditions={"value": "${val}"}`, method: 'get' }

    try {
      const res = await axios(req)
      
      return res.data && res.data[0]
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default ClassifyService
