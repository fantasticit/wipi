import { Component } from 'react'
import Link from 'next/link'
import LinePanel from '../common/line-panel'
import Author from './author'

class RecommendAside extends Component {
  constructor() {
    super()
  }

  render() {
    const { articles = [] } = this.props

    return (
      <div className="recommend">
        <LinePanel title={'推荐文章'} />
        <ul>
          {articles.map((article, i) => (
            <li key={i} className={ article.cover ? 'with-cover' : '' }>
              <Link as={`/article/${article._id}`} href={`/article?id=${article._id}`}>
                <a className="title">{ article.title }</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
        .recommend {
          width: 240px;
          max-height: 400px;
          overflow: auto;
        }
        
        .recommend::-webkit-scrollbar {
          width: 0;
        }

        ul {
          padding-left: 16px;
        }

        ul li {
          position: relative;
          list-style: none;
          cursor: pointer;
        }

        li div {
          width: 100%;
        }

        li:not(:last-of-type) {
          border-bottom: 1px solid #DDDDDD;
        }

        .title {
          margin: -7px 0 10px;
          display: inherit;
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.5;
          color: rgb(0, 0, 0);

          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        `}</style>
      </div>
    )
  }
}

export default RecommendAside
