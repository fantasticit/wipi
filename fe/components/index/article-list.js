import { Component } from 'react'
import Link from 'next/link'
import './article-list.scss'

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
        <div className="el-article-list__content">
          <div className="author">
            <a>{ article.author }</a>
            <span>{ article.createdTime }</span>
          </div>
          <a className="title" href="/">
            <h2>{article.title}</h2>
          </a>
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
