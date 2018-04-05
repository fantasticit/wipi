import { Component } from 'react'
import Link from 'next/link'
import { on } from '../../util/evt'

class Bccktop extends Component {
  constructor() {
    super()
    this.state = { visible: false }
  }

  componentDidMount() {
    if (window) {
      on()(window, 'scroll', () => {
        const currentScroll = document.documentElement.scrollTop
                              || document.body.scrollTop
        
        if (currentScroll > 500) {
          this.setState({ visible: true })
        } else {
          this.setState({ visible: false })
        }
      })
    }
  }

  backTop() {
    if (window) {
      (function smoothScroll() {
        const currentScroll = document.documentElement.scrollTop
                              || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothScroll)
          window.scrollTo(0, currentScroll - (currentScroll / 5))
        }
      })()
    }
  }

  render() {
    const { visible } = this.state

    return(
      <div
        ref="backtop"
        className={visible ? 'is-visible' : 'is-hide'}
        onClick={() => this.backTop()}
      >
        <i className="ion-android-arrow-dropup"></i>
        <style jsx>{`
        div {
          position: fixed;
          right: 2rem;
          bottom: 8rem;
          z-index: 300;
        
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          border: 1px solid #f1f1f1;
          box-shadow: 0 0 5px rgba(0,0,0,.05);
          cursor: pointer;
          background: #fff;
        
          text-align: center;
          line-height: 3rem;
        }
        
        .is-hide {
          display: none;
        }
      
        .is-visible {
          display: block;
          animation: slideDown ease-in-out .2s;
        }
      
        i {
          color: #909090;
          font-size: 18px;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-.6rem)
          } to {
            transform: translateY(0)
          }
        }
        `}</style>
      </div>
    )
  }
}

export default Bccktop
