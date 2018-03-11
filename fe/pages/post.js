import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import ArticleService from '../service/article'
import { fetchTags } from '../redux/reducers/tags'

import LinePanel from '../components/common/line-panel'
import Layout from '../components/common/layout'
import Nav from '../components/post/nav'
import Other from '../components/post/other'


import ArticleList from '../components/post/article-list'

class Post extends Component {
  static async getInitialProps({ query }) {
    const tag = query.id

    const articles = await ArticleService.fetchArticles(tag)
      .catch(e => console.log('获取数据失败'))

    return { articles }
  }

  render() {
    const { tags = [], selectedTag } = this.props

    if (tags.length <= 0) {
      this.props.fetchTags()
    }

    return(
      <Layout activeRoute={'/p'}>
        {/* <Carousel /> */}
        <div className="container">
          <div className="articles">
            <LinePanel title={selectedTag.tag.title} />
            <ul>
              {this.props.articles.map((article, i) => (
                <ArticleList article={article} key={i}/>
              ))}
            </ul>
          </div>
          <aside>
            <Nav />
            {/* <Other /> */}
          </aside>
        </div>
        <style jsx>{`
          .container {
            position: relative;
            margin: 20px auto;
            padding-right: 22rem;
            padding-bottom: 3rem;
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 15px 3rem 15px;
            }
          }

          .articles {
            box-sizing: border-box;
            background: #fff;
          }

          aside {
            position: absolute;
            right: 0;
            top: 0;

            width: 18rem;
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = ({ tags }) => ({
  tags: tags.tags,
  selectedTag: tags.selectedTag
  // classifies: classify.classifies,
  // selectedClassify: classify.selectedClassify 
})


const mapDispatchToProps = dispatch => {
  return {
    fetchTags: bindActionCreators(fetchTags, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Post)
