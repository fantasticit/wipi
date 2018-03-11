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
        <span>阅读量 { readingQuantity }</span>
        <style jsx>{`
        .author {
          color: #909090;
          margin-bottom: 1rem;
          font-size: 1rem;
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
