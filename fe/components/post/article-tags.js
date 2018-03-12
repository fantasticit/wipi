import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTag, fetchTags } from '../../redux/reducers/tags'
import Link from 'next/link'
import LinePanel from '../common/line-panel'

class ArticleTags extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tags = [], selectedTag, changeTag } = this.props

    if (tags.length <= 0) {
      this.props.fetchTags()
    }
    
    return(
      <div>
        <LinePanel title={'文章标签'} />
        <ul>
          <li
            onClick={() => changeTag({ tag: { title: '全部文章', value: '' } })}
            className={
              selectedTag.tag.value === ''
              ? 'is-active'
              : ''
            }>
            <Link href={`/post`}>
              <a>
                <span>全部文章</span>
              </a>
            </Link>
          </li>
          {tags.filter(tag => tag.count > 0).map((tag, i) => (
            <li key={i}
              onClick={() => changeTag(tag)}
              className={
                selectedTag.tag.value === tag.tag.value
                  ? 'is-active'
                  : ''
              }>
              <Link 
                as={`/post/${tag.tag.value}`} 
                href={`/post?id=${tag.tag.value}`}
                >
                <a>
                  <span>{ tag.tag.title }</span>
                  <span> ({ tag.count })</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
        ul {
          color: #71777c;
          font-size: 1.15rem;
          list-style: none;
          padding: 1.5rem 0;
        }

        li {
          position: relative;
          display: inline-block;
          padding: .5rem 1rem;
          border-radius: 4px;
          border-radius: 15px;
          cursor: pointer;
        }

        li.is-active {
          background: rgba(0,0,0,.06)
        }

        li + li {
          margin: .5rem .8rem;
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

const mapStateToProps = ({ tags }) => ({
  tags: tags.tags,
  selectedTag: tags.selectedTag
})

const mapDispatchToProps = dispatch => {
  return {
    fetchTags: bindActionCreators(fetchTags, dispatch),
    changeTag: bindActionCreators(changeTag, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTags)
