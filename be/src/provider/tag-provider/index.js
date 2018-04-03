import BaseHttp from '../base-http'

class _TagProvider extends BaseHttp {
  api = {
    tag: '/tag',
  }

  constructor() {
    super()
  }

  async getTags() {
    const req = {
      url: this.api.tag,
      method: 'get',
    }

    try {
      const res = await this.http(req)
      console.log(res)
      return res.data
    } catch (err) {
      throw new Error(err)
    }
  }

  async getTag(id) {
    const req = {
      url: this.api.tag + '/' + id,
      method: 'get',
    }

    try {
      const res = await this.http(req)
      return res.data.tag
    } catch (err) {
      throw new Error(err)
    }
  }

  async addTag(title, value) {
    const req = {
      url: this.api.tag,
      method: 'post',
      data: {title, value}
    }

    try {
      const res = await this.http(req)
      return '新建标签成功'
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateTag(id, { title, value }) {
    const req = {
      url: this.api.tag + '/' + id,
      method: 'patch',
      data: { title, value }
    }

    try {
      const res = await this.http(req)
      return '更新标签成功'
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteTag(id) {
    const req = {
      url: this.api.tag + '/' + id,
      method: 'delete'
    }

    try {
      const res = await this.http(req)
      return '删除标签成功'
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const TagProvider = new _TagProvider()
