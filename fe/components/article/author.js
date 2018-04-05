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
      createAt,
      readingQuantity,
    } = this.props.author

    const center = this.props.center || false;

    return (
      <div className={ center ? 'author text-center' : 'author' }>
        <span>{ formatTime(createAt) }</span>
        <span>阅读 { readingQuantity }</span>
        <style jsx>{`
        .author {
          font-size: 1rem;
          color: rgb(153, 153, 153);
          margin: 1.5rem 0;
        }

        .text-center {
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
