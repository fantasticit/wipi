import { Component } from 'react'
import { formatTime } from '../../util/format-time'
import Link from 'next/link'
import Author from '../article/author'

class ArticleList extends Component {
  render() {
    const { article } = this.props
    const { classifies = [] } = this.props

    return(
      <li>
        {
          article.cover
            ? <a className="cover">
                <img src={article.cover} />
              </a> 
            : ''
        }
        <div className={
          article.cover
            ? 'content'
            : 'content is-full'
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
        <style jsx>{`
        li {
          position: relative;
          list-style: none;
          margin: 0 auto;
          padding: 1.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        
        li:last-of-type {
          border-bottom: 0;
        }
      
        .cover {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
      
          box-sizing: border-box;
          width: 15rem;
          height: 100%;
          padding: 1.5rem 0;
        }

        .cover img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }

        .content {
          word-wrap: break-word;
          padding-right: 16rem;
        }

        

        .content.is-full {
          padding-right: 0;
        }

        .title {
          display: block;
          margin: -7px 0 4px;
          display: inherit;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.5;
        }
      
        .desc {
          font-size: 1.18rem;
          margin: 0 0 8px;
          line-height: 24px;
        }
    
        .meta span {
          display: inline-block;
          font-size: .8rem;
          color: #969696;
          
          line-height: 1.4;
          vertical-align: middle;
        }
  
        .meta .is-border {
          border: 1px solid #b3b3b3;
          border-radius: 2px;
          padding: .2rem .5rem;
          margin-right: .8rem;
        }
  
        .meta .meta-info {
          display: inline-block;
        }
  
        .meta .more {
          color: #b3b3b3;
          text-decoration: none;
        }

        @media (max-width: 768px) { {
          .cover {
            display: none !important;
          }
      
          .content {
            padding-right: 0 !important;
          }
        }
        `}</style>
      </li>
    )
  }
}

export default ArticleList
