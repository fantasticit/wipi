import { Component } from 'react'
import { highlight } from '../util/highlight'
import { formatTime } from '../util/format-time'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import '../theme/markdown.scss'

class About extends Component {
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
                    <img src="article.cover" />
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
          <Backtop />
        </div>
        <style jsx>{`
          .content {
            padding: 5rem 1.5rem;
            font-size: 1.34rem;
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

export default About
