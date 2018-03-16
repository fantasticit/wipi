import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      showInput: false
    }
  }

  toggleShowInput = () => {
    const node = this.refs.input
    const keyword = node.value.trim()

    if (keyword) {
      this.search(keyword)
    } else {
      this.setState({
        showInput: !this.state.showInput
      })
  
      if (!this.state.showInput) {
        node.focus()
      }
    }
  }

  handleEnter = (e) => {
    if (e.keyCode !== 13) {
      return
    }

    const node = this.refs.input
    const keyword = node.value.trim()
    this.search(keyword)
  }

  search(keyword) {
    this.refs.input.value = ''
    this.toggleShowInput()
    Router.push(`/post?keyword=${keyword}`)
  }

  render() {
    const { activeRoute } = this.props
    const { showInput } = this.state

    return(
      <header>
        <div className="container">
          <Link href={'/post'}>
            <a className="logo">
            <svg version="1.1" viewBox="0 0 226 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="196.572434%" y1="228.815483%" x2="50%" y2="50%" id="l1">
                  <stop offset="0%"></stop>
                  <stop offset="100%"></stop>
                </linearGradient>
              </defs>
                <g transform="translate(-141.000000, -156.000000)">
                  <polygon fill="url(#l1)" points="254 156.459299 367 356 141 356 ">
                  </polygon>
                </g>
              </svg>
              {/* <span>Elapse</span> */}
            </a>
          </Link>
          <div className="search">
            <input
              ref="input"
              placeholder="Search..."
              className={ showInput ? 'is-active' : '' }
              onKeyUp={e => this.handleEnter(e)}
            />
            <i
              className={ showInput ? 'ion-android-done' : 'ion-android-search' }
              onClick={() => this.toggleShowInput()}
            />
          </div>
        </div>
        <style jsx>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 250;
          color: #909090;
          background: #fff;
          padding: 2rem 0;
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }
        }

        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo svg {
          width: 32px;
          height: 32px;
        }
        
        .logo span {
          margin-left: .6rem;
          font-size: 1.6rem;
        }

        .search {
          position: relative;
          width: 15rem;
          height: 2rem;
          line-height: 2rem;
          overflow: hidden;
          font-size: 1.2rem;
        }

        .search i {
          font-size: 1.3em;
          cursor: pointer;
          position: absolute;
          top: 50%;
          right: 5px;
          transform: translateY(-50%);
        }

        .search input {
          position: absolute;
          top: 0%;
          right: -100%;
          width: 0;
          height: 100%;
          transition: all ease .3s;
          border: 0;
          border-bottom: 1px solid #eee;
          padding: 8px 1px;
        }

        .search input.is-active {
          width: 100%;
          right: 0;
        }
        `}</style>
      </header>
    )
  }
}

export default Header
