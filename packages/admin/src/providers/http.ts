import axios from 'axios';
import { message } from 'antd';
import { toLogin } from '@/utils/login';

export const httpProvider = axios.create({
  baseURL: process.env.SERVER_API_URL,
  timeout: 60000,
});

httpProvider.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  () => {
    throw new Error('发起请求出错');
  }
);

httpProvider.interceptors.response.use(
  (data) => {
    if (data.status && +data.status === 200 && data.data.status === 'error') {
      typeof window !== 'undefined' && message.error({ message: data.data.msg });
      return null;
    }
    const res = data.data;
    if (!res.success) {
      message.error(res.msg);
      return null;
    }
    return res.data;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      const status = err.response.status;
      const isClient = typeof window !== 'undefined';

      switch (status) {
        case 504:
        case 404:
          isClient && message.error('服务器异常');
          break;

        case 403:
          isClient && message.warn('访客无权进行该操作');
          break;

        case 401:
          isClient && message.info('请重新登录');
          toLogin();
          break;

        default:
          isClient &&
            message.error(
              (err.response && err.response.data && err.response.data.msg) || '未知错误!'
            );
      }
    }

    return Promise.reject(err);
  }
);
