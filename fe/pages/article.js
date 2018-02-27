import { Component } from 'react'
import { highlight } from '../util/highlight'
import { formatTime } from '../util/format-time'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import '../theme/markdown.scss'

class Article extends Component {
  static async getInitialProps({ query }) {
    const articleId = query.id
    const article = await ArticleService.fetchArticleById(articleId)

    return { article }
  }

  componentDidMount() {
    const oContent = this.refs.content

    highlight(oContent)
  }

  render() {
    const { article } = this.props

    return(
      <Layout>
        <div className="container">
          <div className="content">
            { article.cover 
                ? <div className="cover">
                    <img src={article.cover} />
                  </div>
                : ''
            }
            <div className="author-info">
              <p>
                <span>{ article.author.account }</span>
                <span>{ formatTime(article.createdDate) }</span>
                <span>|</span>
                <span>阅读量{ article.readingQuantity }</span>
              </p>
            </div>
            <div
              ref="content"
              className="markdown-body"
              dangerouslySetInnerHTML={{__html: article.htmlContent}}>
            </div>
          </div>
          <div className="aside">
            <p>文章目录</p>
          </div>
          <Backtop />
        </div>
        <style jsx>{`
          .container {
            position: relative;
          }
            
          .cover {
            width: 100%;
            height: 320px;
            overflow: hidden;
          }

          .cover img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }

          .content {
            max-width: 700px;
            padding: 1.5rem;
            font-size: 1.34rem;
            background: #fff;
          }

          .aside {
            width: 240px;
            position: absolute;
            right: 0;
            top: 0;
          }

          .author-info {
            text-align: center;
          }
          
          .author-info span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }

          .author-info span + span {
            margin-left: .5rem;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Article
