import BaseHttp from '../base-http'

class _ClassifyProvider extends BaseHttp {
  api = {
    classify: '/classify',
  }

  constructor() {
    super()
  }

  async getClassifies() {
    const req = {
      url: this.api.classify + '?select={"title": 1, "value": 1}',
      method: 'get',
    }

    console.log(req)

    try {
      const res = await this.http(req)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  async getClassify(id) {
    const req = {
      url: this.api.classify + '/' + id,
      method: 'get',
    }

    try {
      const res = await this.http(req)
      return res.data.classify
    } catch (err) {
      throw new Error(err)
    }
  }

  async addClassify(title, value, userId) {
    const req = {
      url: this.api.classify,
      method: 'post',
      data: {title, value, userId}
    }

    try {
      const res = await this.http(req)
      return '新建分类成功'
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateClassify(id, { title, value, userId }) {
    const req = {
      url: this.api.classify + '/' + id,
      method: 'patch',
      data: { title, value, userId }
    }

    try {
      const res = await this.http(req)
      return '更新分类成功'
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteClassify(id, userId) {
    const req = {
      url: this.api.classify + '/' + id,
      method: 'delete',
      data: {userId}
    }

    try {
      const res = await this.http(req)
      return '删除分类成功'
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const ClassifyProvider = new _ClassifyProvider()
