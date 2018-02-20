import axios from './config'

class ArticlerService {
  static constructor() {}

  static async fetchArticles() {
    const req = { url: '/article', method: 'get' }

    try {
      const res = await axios(req)

      return res && res.data && res.data.items || []
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default ArticlerService
