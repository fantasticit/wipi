import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTag, fetchTags } from '../../redux/reducers/tags'
import Link from 'next/link'
import LinePanel from '../common/line-panel'

class ArticleClassify extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classifies = [] } = this.props

    return (
      <div>
        <LinePanel color={'#ddd'} title={'文章分类'} />
        <ul>
          {Object.keys(classifies).map((key, i) => (
            <li key={i}>
              <Link
                as={`/post/classify/${classifies[key].classify.value}`}
                href={`/post/classify/?classify=${classifies[key].classify.value}`}
              >
                <a>
                  {key}（{classifies[key].count}）
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
          ul {
            list-style: none;
            color: #c6c7c9;
            font-size: 1.15rem;
            padding-left: 16px;
          }

          li {
            position: relative;
            padding: 0.5rem 0;
            cursor: pointer;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          li.is-active {
            background: rgba(0, 0, 0, 0.06);
          }

          li + li {
            margin: 0.5rem 0;
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

export default ArticleClassify
