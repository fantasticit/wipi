import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1/'
    : 'https://api.iamzx.cn/api/v1/'

const instance = axios.create({
  timeout: 5000,
  baseURL
})

instance.interceptors.request.use(
  config => {
    return config
  },

  err => {
    throw new Error('发起请求出错')
  }
)

instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return (res && res.data) || ''
    } else {
      throw new Error(res.data.message)
    }
  },
  err => {}
)

export default instance
