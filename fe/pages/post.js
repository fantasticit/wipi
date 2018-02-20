import { Component } from 'react'
import { initStore } from '../redux/store'
import { changeClassify } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import ArticleService from '../service/article'

import App from '../container/app'
import Nav from '../components/index/nav'
import ArticleList from '../components/index/article-list'

class Index extends Component {
  static async getInitialProps({ query }) {
    const classify = query.id
    const articles = await ArticleService.fetchArticles()

    return {
      articles
    }
  }

  render() {
    const { dispatch, selectedClassify } = this.props

    return(
      <App>
        <Nav />
        <div className="container articles">
          <div>
            <ul>
              {this.props.articles.map((article, i) => (
                <ArticleList article={article} key={i}/>
              ))}
            </ul>
          </div>
        </div>
        <style jsx>{`
          .articles {
            padding: 5rem 0;
          }
        `}</style>
      </App>
    )
  }
}

{/* <div key={i} dangerouslySetInnerHTML={{__html: article.content}}></div> */}

const mapStateToProps = ({ classifies, selectedClassify }) => ({ classifies, selectedClassify })

const mapDispatchToProps = dispatch => {
  return {
    changeClassify: bindActionCreators(changeClassify, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
