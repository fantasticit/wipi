const axios = require('axios')

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1/'
    : 'https://api.iamzx.cn/api/v1/'
const siteURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost'
    : 'https://iamzx.cn'

const http = axios.create({
  timeout: 5000,
  baseURL
})

let api = `/article?conditions={"state":"publish"}&sort={%22createAt%22:%20-1}`

module.exports = async () => {
  try {
    const res = await http.get(api)
    let data = res.data.data || []

    let head = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`

    let body = data.reduce((accu, curr) => {
      accu += `  <url>\r\n`
      accu += `    <loc>${siteURL}/article/${curr._id}</loc>\r\n`
      accu += `    <lastmod>${curr.createAt}</lastmod>\r\n`
      accu += `    <priority>0.6</priority>\r\n`
      accu += `  </url>\r\n`

      return accu
    }, '')

    let tail = '</urlset>'

    return head + body + tail
  } catch (err) {
    return 'Opps, some error occured!'
  }
}
