import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
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
                <a>{ article.title }</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
        ul {
          list-style: none;
          padding: 1.5rem 0;
          color: #71777c;
          font-size: 1.15rem;
        }

        li {
          position: relative;
          padding: .5rem 0;
          border-radius: 4px;
          border-radius: 15px;
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
        `}</style>
      </div>
    )
  }
}

export default RecentArticles
