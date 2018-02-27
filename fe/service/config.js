import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'http://193.112.102.204:3000'

const instance = axios.create({
  timeout: 5000,
  baseURL,
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
      // if (
      //   res.data.code === 'ok' 
      //   || res.statusText === 'OK'
      // ) {
      //   r
      // } else {
      //   throw new Error(res.data.message || '', 'info')
      // }
    } else {
     throw new Error(res.data.message)
    }
  },
  err => {
    console.log(err)
    console.log('获取数据失败')
    // if (err.response) {
    //   if (err.response.status == 401) {
    //     console.log('出左，401')
    //   } else {
    //     throw new Error(err.response.data.errMsg || '服务器错误')
    //   }
    // }else if (err.request) {
    //   throw new Error('网络环境太差，请稍后再试')
    // }

    // throw new Error(err)
  }
)

export default instance
