import { Component } from 'react'
import { formatTime } from '../../util/format-time'

class Author extends Component {
  constructor() {
    super()
  }

  render() {
    const { 
      account, 
      createdDate, 
      readingQuantity,
    } = this.props.author

    return (
      <div className="author-info">
        <p>
          <span>{ account }</span>
          <span>{ formatTime(createdDate) }</span>
          {/* <span>阅读量{ readingQuantity }</span> */}
        </p>
        <style jsx>{`
        .author-info {
          text-align: center;
        }

        .author-info span {
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        
        .author-info span + span {
          margin-left: .5rem;
        }
        `}</style>
      </div>
    )
  }
}

export default Author
