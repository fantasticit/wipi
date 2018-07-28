import { Component } from 'react'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import Cover from '../components/article/cover'
import Author from '../components/article/author'
import Markdown from '../components/article/markdown'
import Toc from '../components/article/toc'
import Tags from '../components/article/tags'
import Comment from '../components/article/comment'
import Recommend from '../components/article/recommend'
import RecommendAside from '../components/article/recommend-aside'
import ArticlerService from '../service/article'
import { formatTime } from '../util/format-time'

class Article extends Component {
  static async getInitialProps({ query }) {
    const articleId = query.id
    const article = await ArticleService.fetchArticleById(articleId)
    const recommedArticles = await ArticlerService.fetchRecommendArticles(
      articleId
    )
    let readingQuantity = article.readingQuantity + 1
    // 更新文章阅读量
    await ArticleService.updateArticle(article._id, { readingQuantity })
    return { article, recommedArticles }
  }

  setTitle = () => {
    const { article } = this.props
    document.title = `${article.title} | Justemit`
  }

  setMeta = () => {
    const { article } = this.props
    let oHead = document.querySelector('head')
    let oKeywordMeta = document.createElement('meta')
    let oDescMeta = document.createElement('meta')

    oKeywordMeta.setAttribute('id', 'keywordMeta')
    oKeywordMeta.setAttribute('name', 'keyword')
    oKeywordMeta.setAttribute(
      'content',
      article.tags.map(tag => tag.title).join('，')
    )

    oDescMeta.setAttribute('id', 'descMeta')
    oDescMeta.setAttribute('name', 'description')
    oDescMeta.setAttribute('content', article.desc)

    oHead.appendChild(oKeywordMeta)
    oHead.appendChild(oDescMeta)
  }

  deleteMeta = () => {
    let oHead = document.querySelector('head')
    let oKeywordMeta = document.querySelector('#keywordMeta')
    let oDescMeta = document.querySelector('#descMeta')

    try {
      oHead.removeChild(oKeywordMeta)
      oHead.removeChild(oDescMeta)
    } catch (e) {}
  }

  componentDidMount() {
    this.setTitle()
    this.setMeta()
  }

  componentDidUpdate() {
    this.deleteMeta()
    this.setTitle()
    this.setMeta()
  }

  componentWillUnmount() {
    this.deleteMeta()
  }

  render() {
    const { article, recommedArticles } = this.props

    return (
      <Layout
        wrapper={`
      <h1>${article.title}</h1>
      <div class="author text-center">
        <span>${formatTime(article.createAt)}</span>
        <span> 阅读 ${article.readingQuantity}</span>
      </div>
      `}
        cover={
          article.cover
            ? article.cover
            : 'https://cdn.iamzx.cn/background-cover1.png'
        }
      >
        <div className="container">
          <div className="main-container">
            <div className="content">
              {/* <h1>{article.title}</h1>
              <Author
                center={true}
                author={{
                  avatar: article.author.avatar,
                  account: article.author.account,
                  createAt: article.createAt,
                  readingQuantity: article.readingQuantity
                }}
              /> */}
              <Markdown content={article.html} />
              <Tags tags={article.tags} />
              <Comment articleId={article._id} />
            </div>
            {/* <div className="asidebar">
              <nav>
                <RecommendAside articles={recommedArticles} />
                <Toc toc={article.toc} />
              </nav>
            </div> */}
          </div>
        </div>
        <Recommend articles={recommedArticles} />
        <Backtop />
        <style jsx>{`
          .container {
            padding: 2rem 0 3rem 0;
            font-size: 16px;
          }

          h1 {
            color: rgb(0, 0, 0);
            font-weight: 200;
            font-size: 32px;
            margin: 0;
            margin-bottom: 30px;
            text-align: center;
          }

          .main-container {
            position: relative;
            padding-right: 0px;
          }

          .main-container .content {
            width: 100%;
          }

          .main-container .asidebar {
            position: absolute;
            right: 0;
            top: 0;
            width: 240px;
            margin-left: 20px;
          }

          .main-container .asidebar nav {
            position: fixed;
          }

          @media (max-width: 768px) {
            .container {
              padding: 2rem 15px 3rem 15px;
            }

            .main-container {
              padding-right: 0;
            }

            .main-container .asidebar {
              display: none;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

export default Article
