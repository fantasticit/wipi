import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import ArticleService from '../service/article'
import { fecthClassifies } from '../redux/reducers/classify'

import LinePanel from '../components/common/line-panel'
import Carousel from '../components/common/carousel'
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
    const { classifies = [], selectedClassify } = this.props
    if (classifies.length <= 0) {
      this.props.fecthClassifies()
    }

    return(
      <Layout activeRoute={'/p'}>
        <Carousel />
        <div className="container">
          <Nav classifies={classifies}/>
          <div className="articles">
            <LinePanel title={selectedClassify.title} />
            <ul>
              {this.props.articles.map((article, i) => (
                <ArticleList article={article} key={i}/>
              ))}
            </ul>
          </div>
        </div>
        <style jsx>{`
          .container {
            padding-bottom: 3rem;
          }

          .articles {
            box-sizing: border-box;
            background: #fff;
          }

          .articles > div {
            position: relative;
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
