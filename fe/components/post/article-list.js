import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fecthClassifies } from '../../redux/reducers/classify'
import { formatTime } from '../../util/format-time'
import Link from 'next/link'
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
          <div className="author">
            <a>
              <img className="avatar" src={article.author.avatar} />
              <span>{ article.author.account }</span>
            </a>
            <span>
              <span className="dot">●</span> 
              { formatTime(article.createdDate) }
              <span className="dot">●</span> 
              { this.translate(article.classify) }
            </span>
          </div>
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
