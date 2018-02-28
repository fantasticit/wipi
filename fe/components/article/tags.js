import { Component } from 'react'
import './styles/tags.scss'

class Tags extends Component {
  constructor() {
    super()
  }

  render() {
    const { tags } = this.props

    return (
      <div className="el-tags">
        {tags.map((tag, i) => {
          return <div className="el-tag el-tag--info" key={i}>{ tag.title }</div>
        })}
      </div>
    )
  }
}

export default Tags
