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
          font-size: 1rem;
          color: rgb(153, 153, 153);
          margin: 1.5rem 0;
          text-align: center;
        }

        span + span {
          margin-left: 8px;
        }
        `}</style>
      </div>
    )
  }
}

export default Author
