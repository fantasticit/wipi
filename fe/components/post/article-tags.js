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
          {tags.filter(tag => tag && tag.value).map((tag, i) => (
            <li key={i}>
              <Link 
                as={`/post/${tag.value}`} 
                href={`/post?id=${tag.value}`}
                >
                <a>
                  <span>{ tag.title }</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
        ul {
          color: #333;
          font-size: 1.15rem;
          list-style: none;
          padding-left: 16px;
        }

        ul::after {
          content: '';
          display: table;
          clear: both;
        }

        li {
          float: left;
          list-style: none;
          margin-right: 10px;
          margin-top: 5px;
        }

        a {
          position: relative;
          display: block;
          border: 1px solid #e5e5e5;
          border-radius: 34px;
          font-size: 1rem;
          color: #242f35;
          padding: 8px 10px;
          transition: all ease .3s;
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
