import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { fecthClassifies } from '../../redux/reducers/classify'
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

    // if (classifies.length <= 0) this.props.fecthClassifies()

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
          <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
            <a className="title">{article.title}</a>
          </Link>
          <p className="desc">{ article.desc }</p>
          <div className="meta">
            <span className="is-border">{ article.classify }</span>
            <div className="meta-info">
              <Author author={{
                avatar: article.author.avatar,
                account: article.author.account,
                createdDate: article.createdDate,
                readingQuantity: article.readingQuantity,
              }} />
            </div>
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({  }) => ({  })

const mapDispatchToProps = dispatch => {
  return {
    // fecthClassifies: bindActionCreators(fecthClassifies, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
