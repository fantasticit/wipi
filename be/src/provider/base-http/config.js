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
    if (res.data.status === 'ok' || res.status === 200) {
      return res.data
    } else {
     throw new Error(res.data.message)
    }
  },
  err => Promise.reject(err)
)

export default instance
