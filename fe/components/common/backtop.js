import { Component } from 'react'
import Link from 'next/link'
import { on } from '../../util/evt'
import './styles/backtop.scss'

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
        className={visible ? 'el-backtop is-visible' : 'el-backtop is-hide'}
        onClick={() => this.backTop()}
      >
        Top
      </div>
    )
  }
}

export default Bccktop
