import { Component } from 'react'

class Tags extends Component {
  constructor() {
    super()
  }

  render() {
    const { tags } = this.props

    return (
      <div>
        {tags.map((tag, i) => {
          return <div className="tag" key={i}>{ tag.title }</div>
        })}
        <style jsx>{`
        .tag {
          display: inline-block;
          margin: 0 16px 16px 0;
          padding: 0 15px;
          height: 30px;
          line-height: 30px;
          max-width: 100%;
          background: #000;
          background: rgba(0,0,0,.06);
          color: #666768;
          border-radius: 15px;
          text-align: center;
          font-size: 14px;
        }
        `}</style>
      </div>
    )
  }
}

export default Tags
