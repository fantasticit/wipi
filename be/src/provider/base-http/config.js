import axios from 'axios'
import store from '@/store'
import router from '@/router';
import { confirm } from '@/components/common/messagebox/index'

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://193.112.102.204:3000'
  : 'http://193.112.102.204:3000'

const instance = axios.create({
  timeout: 5000,
  baseURL,
})

instance.interceptors.request.use(
  config => {
    const token = window.sessionStorage.getItem('token')

    if (
      config.url !== '/user/loin'
      || config.url !== '/user/register'
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  err => {
    throw new Error('发起请求出错')
  }
)

instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if (
        res.data.code === 'ok' 
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
      if (err.response.status == 401) {
        confirm('您需要重新登录以获取token，是否继续？', '提示', {})
          .then(() => {
            store.dispatch('logout')
              .then(() => {
                router.replace({
                  path: '/login',
                  query: { redirect: router.currentRoute.fullPath }
                })
              })
            })
          .catch(err => console.log('拒绝'))
      } else {
        throw new Error(err.response.data.errMsg || '服务器错误')
      }
    }else if (err.request) {
      throw new Error('网络环境太差，请稍后再试')
    }

    throw new Error(err)
  }
)

export default instance
