import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Nav from '../components/post/nav'
import ArticleList from '../components/post/article-list'

class Post extends Component {
  static async getInitialProps({ query }) {
    console.log(query)

    const classify = query.id
    const articles = await ArticleService.fetchArticles(classify)
      .catch(e => console.log('获取数据失败'))

    return { articles }
  }

  render() {
    const { dispatch, selectedClassify } = this.props

    return(
      <Layout>
        <div className="page">
          <Nav />
          <div className="container">
            <div className="articles">
              <ul>
                {this.props.articles.map((article, i) => (
                  <ArticleList article={article} key={i}/>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style jsx>{`
          .page {
            margin: -3rem 0 0 0;
          }

          .container {
          }

          .articles {
            box-sizing: border-box;
            background: #fff;
            padding: 0 1.5rem;
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = ({ classifies, selectedClassify }) => ({ classifies, selectedClassify })

const mapDispatchToProps = dispatch => {
  return {
    // changeClassify: bindActionCreators(changeClassify, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Post)
