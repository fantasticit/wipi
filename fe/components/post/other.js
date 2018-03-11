import { Component } from 'react'
import Link from 'next/link'
import LinePanel from '../common/line-panel'

class Other extends Component {
  constructor() {
    super()
  }

  render() {
    const { activeRoute } = this.props

    return (
      <div>
        <LinePanel />
        <span>
          <Link href="/p">
            <a >关于</a>
          </Link>
        </span>
        <span className="dot">●</span>
        <span>
          归档
        </span>
        <style jsx>{`
        div {
          color: #555;
          font-size: .8rem;
        }
        
        .dot {
          margin: 0 .5rem;
        }
        `}</style>
      </div>
    )
  }
}

export default Other
