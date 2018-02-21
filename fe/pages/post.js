import { Component } from 'react'
import { initStore } from '../redux/store'
import { changeClassify } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'

import ArticleService from '../service/article'

import Layout from '../components/common/layout'
import Nav from '../components/post/nav'
import ArticleList from '../components/post/article-list'

class Post extends Component {
  static async getInitialProps({ query }) {
    const classify = query.id
    const articles = await ArticleService.fetchArticles()
      .catch(e => console.log('获取数据失败'))

    return { articles }
  }

  render() {
    const { dispatch, selectedClassify } = this.props

    return(
      <Layout>
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
      </Layout>
    )
  }
}

const mapStateToProps = ({ classifies, selectedClassify }) => ({ classifies, selectedClassify })

const mapDispatchToProps = dispatch => {
  return {
    changeClassify: bindActionCreators(changeClassify, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Post)
