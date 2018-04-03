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

class Article extends Component {
  static async getInitialProps({ query }) {
    const articleId = query.id
    const article = await ArticleService.fetchArticleById(articleId)
    let readingQuantity = article.readingQuantity + 1;
    // 更新文章阅读量
    await ArticleService.updateArticle(article._id, { readingQuantity })
    return { article }
  }

  componentDidMount() {
    const { article } = this.props
    document.title = `${article.title} | CodingFun`
  }

  render() {
    const { article } = this.props

    return(
      <Layout>
        <div className="container">
          <div className="main-container">
            <div className="content">
              <h1>{ article.title }</h1>
              <Author author={{
                avatar: article.author.avatar,
                account: article.author.account,
                createAt: article.createAt,
                readingQuantity: article.readingQuantity,
              }} />
              { article.cover ? <Cover cover={article.cover} />: ''}
              <Markdown content={article.html} />
              <Tags tags={article.tags} />
              <Comment articleId={article._id} />
            </div>
            <div className="asidebar">
              <Toc toc={article.toc} />
            </div>
          </div>
        </div>
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
          display: flex;
        }

        .main-container .content {
          width: 100%;
          flex: 1;
        }

        .main-container .asidebar {
          width: 240px;
          margin-left: 20px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 2rem 15px 3rem 15px;
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
