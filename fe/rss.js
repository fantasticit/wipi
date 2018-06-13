const axios = require('axios')

const baseURL = process.env.NODE_ENV === 'development' ? 'https://api.iamzx.cn/api/v1/' : 'https://api.iamzx.cn/api/v1/'
const siteURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://iamzx.cn'

const http = axios.create({
  timeout: 5000,
  baseURL
})

let api = `/article?conditions={"state":"publish"}&sort={%22createAt%22:%20-1}`

module.exports = async () => {
  try {
    const res = await http.get(api)
    let data = res.data.data || []

    let head = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>Hyiron 的小站</title>
      <link>${siteURL}</link>
      <description>$本站是 Hyiron（https://github.com/hyiron）编写的博客，用以分享开发路上所学所见及所得。</description>
      <atom:link href="${siteURL}/rss.xml" rel="self"/>
      <language>zh-cn</language>\r\n`
    let body = data.reduce((accu, curr) => {
      let date = new Date(curr.createAt).toUTCString()
      let content = curr.html.replace(/&/g, '&amp;')
                                        .replace(/</g, '&lt;')
                                        .replace(/>/g, '&gt;')
                                        .replace(/"/g, '&quot;')
                                        .replace(/'/g, '&apos;')
      accu += `    <item>\r\n`
      accu += `      <title>${curr.title}</title>\r\n`
      accu += `      <link>${siteURL}/article/${curr._id}</link>\r\n`
      accu += `      <description>${content}</description>\r\n`
      accu += `      <pubDate>${date}</pubDate>\r\n`
      accu += `      <guid>${siteURL}/article/${curr._id}</guid>\r\n`
      accu += `    </item>\r\n`

      return accu
    }, '')

    let tail = `  </channel>
    </rss>`

    let getUpdatedDate = date => `    <lastBuildDate>${date}</lastBuildDate>\r\n`
    return (head + getUpdatedDate(new Date().toUTCString()) + body + tail)
  } catch (err) {
    return 'Opps, some error occured!'
  }
}
