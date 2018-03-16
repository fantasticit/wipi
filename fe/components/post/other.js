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
        <span>
          <Link href="/about">
            <a >关于</a>
          </Link>
        </span>
        <span className="dot">●</span>
        <span>
          <a href="http://193.112.102.204" target="_blank">管理后台</a>
        </span>
        <style jsx>{`
        div {
          color: #555;
          font-size: 1.1rem;
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
