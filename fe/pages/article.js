import { Component } from 'react'
import { highlight } from '../util/highlight'
import Layout from '../components/common/layout'
import ArticleService from '../service/article'
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
          <div
            ref="content"
            className="markdown-body"
            dangerouslySetInnerHTML={{__html: article.htmlContent}}>
          </div>
        </div>
      </Layout>
    )
  }
}

export default About
