import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

export const httpProvider = axios.create({
  baseURL: process.env.SERVER_API_URL,
  timeout: 60000,
});

httpProvider.interceptors.request.use(
  (config) => {
    return config;
  },

  () => {
    throw new Error('发起请求出错');
  }
);

httpProvider.interceptors.response.use(
  (
    data: AxiosResponse<{
      statusCode: number;
      success: boolean;
      msg: string | null;
      data: unknown;
    }>
  ) => {
    if (data.status && +data.status === 200 && !data.data.success) {
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

      switch (status) {
        case 504:
        case 404:
          typeof window !== 'undefined' && message.error('服务器异常');
          break;

        default:
          typeof window !== 'undefined' &&
            message.error((err.response && err.response.data && err.response.data.msg) || '未知错误!');
      }
    }

    return Promise.reject(err);
  }
);
