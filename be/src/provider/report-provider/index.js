import BaseHttp from '../base-http'

class _ReportProvider extends BaseHttp {
  api = {
    getPerformences: '/feperformence',
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

  async getPerformences() {
    const req = {
      url: this.api.getPerformences,
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
