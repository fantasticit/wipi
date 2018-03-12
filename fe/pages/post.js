import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import ArticleService from '../service/article'
import { fetchTags } from '../redux/reducers/tags'
import LinePanel from '../components/common/line-panel'
import Layout from '../components/common/layout'
import ArticleTags from '../components/post/article-tags'
import RecentArricles from '../components/post/recent-articles'
import Other from '../components/post/other'
import ArticleList from '../components/post/article-list'

let isSerach = false

class Post extends Component {
  constructor() {
    super()
    this.state = {
      showAside: false
    }
  }

  static async getInitialProps({ query }) {
    const tag = query.id
    const keyword = query.keyword
    let articles = []

    if (keyword) {
      articles = await ArticleService.fetchArticles(null, keyword)
        .catch(e => console.log('获取数据失败'))
      isSerach = true
    } else {
      articles = await ArticleService.fetchArticles(tag, null)
        .catch(e => console.log('获取数据失败'))
        isSerach = false
    }
    
    const recentArticles = await ArticleService.fetchRecentArticles()
      .catch(e => console.log('获取数据失败'))

    return { articles, recentArticles }
  }

  toggleAside = () => {
    const isMobile = (/mobile/ig).test(window.navigator.userAgent)

    if (!isMobile) {
      return
    }

    this.setState({
      showAside: !this.state.showAside
    })
  }

  render() {
    const { showAside } = this.state
    const { tags = [], selectedTag, articles = [], recentArticles } = this.props

    if (tags.length <= 0) {
      this.props.fetchTags()
    }

    return(
      <Layout activeRoute={'/p'}>
        {/* <Carousel /> */}
        <div className="container">
          <div className="articles">
            <LinePanel title={isSerach ? '文章搜索' : selectedTag.tag.title} />
            <ul>
              {articles.map((article, i) => (
                <ArticleList article={article} key={i}/>
              ))}
            </ul>
          </div>
          <aside
            className={ showAside ? 'is-active' : '' }
            onClick={() => this.toggleAside()}
          >
            <RecentArricles articles={recentArticles} />
            <ArticleTags />
            <Other />
          </aside>
          <div
            className={ showAside ? 'm-fbtn is-close' : 'm-fbtn' }
            onClick={() => this.toggleAside()}>
            <i className='ion-plus-round' />
          </div>
        </div>
        <style jsx>{`
          .container {
            position: relative;
            margin: 20px auto;
            padding-right: 22rem;
            padding-bottom: 3rem;
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

          .m-fbtn {
            display: none;
            position: fixed;
            right: 2rem;
            bottom: 11rem;
            z-index: 1000;

            width: 2.67rem;
            height: 2.67rem;
            border-radius: 50%;
            background: #0080ff;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 2.84rem;
          }

          .m-fbtn.is-close {
            transform: rotate(45deg);
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 15px 3rem 15px;
            }

            .m-fbtn {
              display: block;
            }

            aside {
              box-sizing: border-box;
              position: fixed;
              left: 0;
              top: -100%;
              z-index: 100;
              background: #fff;

              width: 100vw;
              height: 0;
            }

            aside.is-active {
              top: 5rem;
              height: calc(100vh - 15rem);
              overflow: auto;
              padding: 20px 15px 0 15px;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = ({ tags }) => ({
  tags: tags.tags,
  selectedTag: tags.selectedTag
})

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: bindActionCreators(fetchTags, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Post)
