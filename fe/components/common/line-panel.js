import { Component } from 'react'

class LinePanel extends Component {
  constructor() {
    super()
  }

  render() {
    const { title, color = '#242f35' } = this.props

    return (
      <h3 style={{ color: color }}>
        {title}
        <style jsx>{`
          h3 {
            position: relative;
            font-size: 1.333rem;
            padding-left: 1.333rem;
            margin: 30px auto 20px;
            font-weight: 400;
            height: 20px;
            line-height: 20px;
          }

          h3::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(to bottom, #1a1818 35%, #353030 100%) left center no-repeat;
            background-size: 100%;
          }
        `}</style>
      </h3>
    )
  }
}

export default LinePanel
