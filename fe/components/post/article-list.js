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
        <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
          <a>
            {
              article.cover
                ? <div className="cover">
                    <img src={article.cover} />
                  </div> 
                : ''
            }
            <div className="content">
              <h2 className="title">
                <span>{article.title}</span>
              </h2>
              <p className="desc">{ article.desc }</p>
              <div className="meta">
                <span className="is-border">{ article.classify.title }</span>
                <div className="meta-info">
                  <Author author={{
                    avatar: article.author.avatar,
                    account: article.author.account,
                    createAt: article.createAt,
                    readingQuantity: article.readingQuantity,
                  }} />
                </div>
              </div>
            </div>
          </a>
        </Link>
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
          height: 180px;
          margin-bottom: 22px;
        }

        .cover img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }

        .content {
          word-wrap: break-word;
        }

        .title {
          margin: -7px 0 10px;
          display: inherit;
          font-size: 1.5rem;
          font-weight: 500;
          line-height: 1.5;
          color: rgb(0, 0, 0);
        }

        .title span {
          position: relative;
        }
      
        .desc {
          font-size: 1.18rem;
          margin: 0 0 8px;
          line-height: 24px;
          color: #333;
        }

        .meta {
          display: flex;
          justify-content: flex-start;
          align-items: center;
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
            position: relative;
            right: 0;
            top: 0;
            transform: translateY(0);
            width: 100%;
            padding: 0 0 1rem 0;
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
