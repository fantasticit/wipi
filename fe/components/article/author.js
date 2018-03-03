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
    } = this.props.author

    return (
      <div className="author">
        <a>
          <img className="avatar" src={avatar} />
          <span>{ account }</span>
        </a>
        <span>
          <span className="dot">●</span> 
          { formatTime(createdDate) }
        </span>
        <style jsx>{`
        .author {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #909090;
          margin-bottom: 1rem;
        }

        a {
          display: inline-flex;
          justify-content: center;
          align-items: center;

          height: 32px;
        }
  
        .avatar {
          width: 32px;
          height: 100%;
          border-radius: 50%;
          margin-right: 5px;
        }
  
        .dot {
          margin: 0 5px;
          font-size: 10px;
        }
        `}</style>
      </div>
    )
  }
}

export default Author
