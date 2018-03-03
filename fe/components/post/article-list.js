import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fecthClassifies } from '../../redux/reducers/classify'
import { formatTime } from '../../util/format-time'
import Link from 'next/link'
import Author from '../article/author'
import './styles/article-list.scss'

class ArticleList extends Component {
  translate(classify) {
    const classifies = JSON.parse(JSON.stringify(this.props.classifies)) || []

    if (classifies.length <= 0) {
      return classify
    } else {
      return classifies.find(item => item.value === classify).title
    }
  }

  render() {
    const { article } = this.props
    const { classifies = [] } = this.props

    if (classifies.length <= 0) this.props.fecthClassifies()

    return(
      <li className="el-article-list">
        {
          article.cover 
            ? <a className="el-article-list__cover">
                <img src={article.cover} />
              </a> 
            : ''
        }
        <div className={
          article.cover
            ? 'el-article-list__content'
            : 'el-article-list__content is-full'
        }>
          <Author author={{
            avatar: article.author.avatar,
            account: article.author.account,
            createdDate: article.createdDate,
            readingQuantity: article.readingQuantity,
          }} />
          <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
            <a className="title">
              <h2>{article.title}</h2>
            </a>
          </Link>
          <p className="desc">{ article.desc }</p>
          <div className="meta">
            <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
              <a className="more">
                继续阅读 »
              </a>
            </Link>
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({ classify }) => ({ classifies: classify.classifies })

const mapDispatchToProps = dispatch => {
  return {
    fecthClassifies: bindActionCreators(fecthClassifies, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
