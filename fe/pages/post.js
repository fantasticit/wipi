import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import ArticleService from '../service/article'
import { fecthClassifies } from '../redux/reducers/classify'

import Layout from '../components/common/layout'
import Nav from '../components/post/nav'
import ArticleList from '../components/post/article-list'

class Post extends Component {
  static async getInitialProps({ query }) {
    const classify = query.id
    const articles = await ArticleService.fetchArticles(classify)
      .catch(e => console.log('获取数据失败'))

    return { articles }
  }

  render() {
    const { classifies = [] } = this.props
    if (classifies.length <= 0) {
      this.props.fecthClassifies()
    }

    return(
      <Layout activeRoute={'/p'}>
        <div className="page">
          <div className="container">
            <Nav classifies={classifies}/>
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
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = ({ classify }) => ({  
  classifies: classify.classifies,
  selectedClassify: classify.selectedClassify 
})


const mapDispatchToProps = dispatch => {
  return {
    fecthClassifies: bindActionCreators(fecthClassifies, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Post)
