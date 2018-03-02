import { Component } from 'react'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import Cover from '../components/article/cover'
import Author from '../components/article/author'
import Markdown from '../components/article/markdown'
import Tags from '../components/article/tags'
import Comment from '../components/article/comment'

class Article extends Component {
  static async getInitialProps({ query }) {
    const articleId = query.id
    const article = await ArticleService.fetchArticleById(articleId)

    return { article }
  }

  render() {
    const { article } = this.props

    return(
      <Layout>
        <div className="container">
          { article.cover ? <Cover cover={article.cover} />: ''}
          <Author author={{
            account: article.author.account,
            createdDate: article.createdDate,
            readingQuantity: article.readingQuantity,
          }} />
          <Markdown content={article.htmlContent} />
          <Tags tags={article.tags} />
          {/* <Comment /> */}
        </div>
        <Backtop />
      </Layout>
    )
  }
}

export default Article
