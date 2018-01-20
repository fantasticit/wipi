import BaseHttp from '../base-http'

class _ArticleProvider extends BaseHttp {
  api = {
    add: '/article/new',
  }

  constructor() {
    super()
  }

  async add({
    title,
    author,
    date,
    classify,
    tags,
    content_md,
    content_html,
  }) {
    const req = {
      url: this.api.add,
      method: 'POST',
      data: { 
        title,
        author,
        classify,
        tags,
        content_md,
        content_html, 
      },
    }

    try {
      const res = await this.http(req)
      return `发表文章成功`
    } catch (err) {
      throw new Error(err)
    }
  }
}

export const ArticleProvider = new _ArticleProvider()
