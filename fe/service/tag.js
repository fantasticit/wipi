import axios from './config'

class TagService {
  static constructor() {}

  // 获取文章标签
  static async fetchTags() {
    const req = { url: '/tag', method: 'get' }

    try {
      const res = await axios(req)
      
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 根据标签值获取整个标签
  static async fetchTagByValue(val) {
    const req = { url: `/tag?conditions={"value": "${val}"}`, method: 'get' }

    try {
      const res = await axios(req)
      
      return res.data && res.data[0]
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default TagService
