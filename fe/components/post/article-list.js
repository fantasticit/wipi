import { Component } from 'react'
import { formatTime } from '../../util/format-time'
import Link from 'next/link'
import './styles/article-list.scss'

class ArticleList extends Component {
  render() {
    const { article } = this.props

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
            <span>{ formatTime(article.createdDate) }</span>
          </div>
          <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
            <a className="title">
              <h2>{article.title}</h2>
            </a>
          </Link>
          <p className="desc">{ article.desc }</p>
          <div className="meta">
            <a className="meta-classify">{ article.classify }</a>
          </div>
        </div>
      </li>
    )
  }
}

export default ArticleList
