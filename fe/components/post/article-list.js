import { Component } from 'react'
import { formatTime } from '../../util/format-time'
import Link from 'next/link'
import Author from '../article/author'

class ArticleList extends Component {
  render() {
    const { article } = this.props
    const { classifies = [] } = this.props

    return (
      <li>
        <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
          <a>
            <div className="content">
              <h2 className="title">
                <span>{article.title}</span>
              </h2>
              <p className="desc">{article.desc}</p>
            </div>
            <div className="cover">
              { article.cover ? <img src={article.cover} /> : '' }
            </div>
            <div className="meta"># {article.classify.title}</div>
          </a>
        </Link>
        <style jsx>{`
          li {
            position: relative;
            box-sizing: border-box;
            display: inline-flex;
            width: 33%;
            height: 458px;
            list-style: none;

            padding: 0 15px;
            margin-top: 30px;
          }

          li > a {
            display: block;
            box-sizing: border-box;
            width: 100%;
            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            border: 1px solid #eee;
            transition: box-shadow 0.2s linear;
          }

          li > a:hover {
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.15);
          }

          .cover {
            height: 200px;
          }

          .cover img {
            width: 100%;
            height: 100%;
          }

          .content {
            word-wrap: break-word;
            padding: 30px 30px 0 30px;
            height: 170px;
            overflow: hidden;
          }

          .meta {
            height: 60px;
            line-height: 60px;
            padding: 0 30px;
            font-size: 1.2rem;
            color: #a5a5a5;
            -webkit-font-smoothing: antialiased;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
            max-height: 120px;
            color: #676b6f;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          .meta {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .meta span {
            display: inline-block;
            font-size: 0.8rem;
            color: #969696;

            line-height: 1.4;
            vertical-align: middle;
          }

          .meta .is-border {
            border: 1px solid #b3b3b3;
            border-radius: 2px;
            padding: 0.2rem 0.5rem;
            margin-right: 0.8rem;
          }

          .meta .meta-info {
            display: inline-block;
          }

          .meta .more {
            color: #b3b3b3;
            text-decoration: none;
          }

          @media (max-width: 768px) {
            li {
              display: flex;
              width: 100%;
            }
          }
        `}</style>
      </li>
    )
  }
}

export default ArticleList
