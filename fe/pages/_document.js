import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover" />
          <meta name="keyword" content="CodingFun，mvpzx，个人博客，前端，NodeJs，Vue.js，React，MVVM" />
          <meta name="description" content="CodingFun是mvpzx（https://github.com/mvpzx）编写的开发博客，用以分享开发路上所学所见及所得。" />
          <link rel="icon" type="image/png" sizes="16x16" href="http://p39p1kvxn.bkt.clouddn.com/elapse.ico" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/styles/default.min.css" />
          <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
        </body>
      </html>
    )
  }
}