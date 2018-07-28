import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `var _hmt = _hmt || [];
            (function() {
              let hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?1812887dfbcca0f17122188debd08ba4";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();`
            }}
          />

          <meta name="application-name" content="justemit 的小站" />
          <meta name="msapplication-starturl" content="https://iamzx.cn" />
          <meta name="apple-mobile-web-app-title" content="justemit 的小站" />
          <meta
            name="keyword"
            content="justemit，个人博客，前端，NodeJs，Vue.js，React，MVVM"
          />
          <meta
            name="description"
            content="本站是 justemit（https://github.com/justemit）编写的博客，用以分享开发路上所学所见及所得。"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://cdn.iamzx.cn/elapse.ico"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/styles/default.min.css"
          />
          <link
            href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/gitalk/dist/gitalk.css"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://unpkg.com/gitalk/dist/gitalk.min.js" />
        </body>
      </html>
    )
  }
}
