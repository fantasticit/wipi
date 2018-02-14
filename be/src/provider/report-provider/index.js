import BaseHttp from '../base-http'

class _ReportProvider extends BaseHttp {
  api = {
    getPerformences: '/feperformence',
    getApiPerformences: '/performence/api',
    getApiList: '/performence/api/list',
    getApiAvarageResTime: '/performence/api/res/time/avarage',
    getApiCallTime: '/performence/api/calltime',
    getStatics: '/feperformence/statics',
    addPerformence: '/feperformence',
  }

  constructor() {
    super()
  }

  async reportPerformence(report) {
    const req = {
      url: this.api.addPerformence,
      method: 'POST',
      data: report
    }

    try {
      const res = await this.http(req)
      return `成功`
    } catch (err) {
      throw new Error(err)
    }
  }

  async getPerformences(appName) {
    const req = {
      url: this.api.getPerformences + `?appName=${appName}`,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 获取接口列表
  async getApiList() {
    const req = {
      url: this.api.getApiList,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 获取各个接口响应时间
  async getApiAvarageResTime() {
    const req = {
      url: this.api.getApiAvarageResTime,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 获取接口调用次数
  async getApiCallTime() {
    const req = {
      url: this.api.getApiCallTime,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  async getApiPerformences(requestUrl) {
    const req = {
      url: this.api.getApiPerformences + `?requestUrl=${requestUrl}`,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  async getStatics() {
    const req = { url: this.api.getStatics, method: 'get' }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const ReportProvider = new _ReportProvider()
