import { httpProvider } from './http';

export class ViewProvider {
  /**
   * 获取所有访问
   */
  static async getViews(params): Promise<[IView[], number]> {
    return httpProvider.get('/view', { params });
  }

  /**
   * 添加访问
   * @param data
   */
  static async addView(data): Promise<IView> {
    return httpProvider.post('/view', data);
  }

  static async getViewsByUrl(url): Promise<IView[]> {
    return httpProvider.get('/view/url', { params: { url } });
  }

  static async deleteView(id): Promise<IView> {
    return httpProvider.delete('/view/' + id);
  }

  static async parseIp(ip) {
    // 用 jsonp 的方式避免跨域问题
    return new Promise((resolve, reject) => {
      const JSONP = document.createElement('script');
      (<any>window).jsonCallBack = (result) => {
        document.getElementsByTagName('head')[0].removeChild(JSONP);

        if (result && +result.resultcode === 200) {
          const data = result.result;
          resolve(`${data.Country} ${data.Province} ${data.City} ${data.Isp}`);
        } else {
          reject('IP 解析接口错误');
        }
      };
      JSONP.type = 'text/javascript';
      // 请前往聚合数据申请 ip 解析服务，替换掉下方 key 值
      const key = 'aa7d9827be401c0f3e089be7b0a06dec';
      JSONP.src = `https://apis.juhe.cn/ip/ipNew?ip=${ip}&key=${key}&callback=jsonCallBack`;
      document.getElementsByTagName('head')[0].appendChild(JSONP);
    });
  }
}
