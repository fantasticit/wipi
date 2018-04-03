import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import { formatTime } from '../../util/format-time'
import LinePanel from '../common/line-panel'

class RecentArticles extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { articles = [] } = this.props

    return(
      <div>
        <LinePanel title={'最新文章'} />
        <ul>
          {articles.map((article, i) => (
            <li key={i}>
              <Link 
                as={`/article/${article._id}`} 
                href={`/article?id=${article._id}`}
                >
                <a>
                  <p className="title">{ article.title }</p>
                  <p className="date">{ formatTime(article.createAt) }</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
        ul {
          list-style: none;
          color: #333;
          font-size: 1.15rem;
          padding-left: 16px;
        }

        li {
          position: relative;
          padding: .5rem 0;
          cursor: pointer;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        li.is-active {
          background: rgba(0,0,0,.06)
        }

        li + li {
          margin: .5rem 0;
        }

  
        a::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        p {
          margin: 5px 0;
        }

        p.date {
          font-size: .8em;
          color: #666;
        }
        `}</style>
      </div>
    )
  }
}

export default RecentArticles
