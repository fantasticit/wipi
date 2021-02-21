import axios from 'axios';
import { message } from 'antd';
import Router from 'next/router';

export const httpProvider = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api'
      : 'https://api.blog.wipi.tech/api',
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

  (err) => {
    throw new Error('发起请求出错');
  }
);

httpProvider.interceptors.response.use(
  (data) => {
    if (data.status && data.status == 200 && data.data.status == 'error') {
      typeof window !== 'undefined' && message.error({ message: data.data.msg });
      return;
    }

    const res = data.data;

    if (!res.success) {
      message.error(res.msg);
      return;
    }

    return res.data;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 504:
        case 404:
          typeof window !== 'undefined' && message.error('服务器异常');
          break;

        case 403:
          typeof window !== 'undefined' && message.warn('访客无权进行该操作');
          break;

        case 401:
          typeof window !== 'undefined' && message.info('请重新登录');
          Router.push('/login');
          break;

        default:
          typeof window !== 'undefined' &&
            message.error(
              (err.response && err.response.data && err.response.data.msg) || '未知错误!'
            );
      }
    }

    return Promise.reject(err);
  }
);
