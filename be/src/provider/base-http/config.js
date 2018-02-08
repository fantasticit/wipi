import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : ''

const instance = axios.create({
  timeout: 5000,
  baseURL,
})

instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if (
        res.data.status === 'ok' 
        || res.statusText === 'OK'
      ) {
        return res.data
      } else {
        throw new Error(res.data.message || '', 'info')
      }
    } else {
     throw new Error(res.data.message)
    }
  },
  err => {
    if (err.response) {
      throw new Error(err.response.data.errMsg || '服务器错误')
    }else if (err.request) {
      throw new Error('网络环境太差，请稍后再试')
    }

    throw new Error(err)
  }
)

export default instance
