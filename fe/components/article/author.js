import { Component } from 'react'
import { formatTime } from '../../util/format-time'

class Author extends Component {
  constructor() {
    super()
  }

  render() {
    const { 
      avatar,
      account, 
      createdDate,
      readingQuantity,
    } = this.props.author

    return (
      <div className="author">
        <span>{ formatTime(createdDate) }</span>
        <span>阅读 { readingQuantity }</span>
        <style jsx>{`
        .author {
          color: #909090;
          margin: 1.5rem 0;
          font-size: 1.3rem;
        }
  
        span {
          margin-right: .5rem;
        }
        `}</style>
      </div>
    )
  }
}

export default Author
