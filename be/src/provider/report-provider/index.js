import BaseHttp from '../base-http'

class _ReportProvider extends BaseHttp {
  api = {
    addFeError: '/error/webpage',
    getFePerformences: '/performence/webpage',
    getFeStatics: '/performence/fe/statics',
    addFePerformence: '/performence/webpage',

    getApiList: '/performence/api/list',
    getApiPerformences: '/performence/api',
    getApiCallTimes: '/performence/api/list/calltime',
    getApiAvarageResTime: '/performence/api/list/restime',
    getApiErrorLog: '/error/api',
  }

  constructor() {
    super()
  }

  // 报告前端性能（首屏耗时与加载耗时）
  async reportFePerformence(report) {
    const req = {
      url: this.api.addFePerformence,
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

  // 报告前端错误
  async reportFeError({error, vm, info, appName}) {
    const errMsg = error.message
    const errStack = error.stack

    const req = {
      url: this.api.addFeError,
      method: 'POST',
      data: {
        vm,
        info,
        errMsg,
        errStack,
        appName
      }
    }

    try {
      const res = await this.http(req)
      return `成功`
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  // 获取前端性能
  async getFePerformences(appName) {
    const req = {
      url: this.api.getFePerformences + `?appName=${appName}`,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 获取前端错误
  async getFeErrors(query) {
    query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

    const req = {
      url: this.api.addFeError + `?${query}`,
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
  async getApiCallTimes() {
    const req = {
      url: this.api.getApiCallTimes,
      method: 'get'
    }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  // 获取接口性能（接口响应时间）
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

  // 获取接口错误日志
  async getApiErrorLog(query) {
    query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

    const req = {
      url: this.api.getApiErrorLog + `?${query}`,
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
    const req = { url: this.api.getFeStatics, method: 'get' }

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const ReportProvider = new _ReportProvider()
