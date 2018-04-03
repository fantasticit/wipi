import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import ClickOutside from './click-outside'

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
      } else {
        node.blur()
      }
    }
  }

  hide = () => {
    this.setState({
      showInput: false
    })
    const node = this.refs.input
    node.blur()
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
              <img src="http://p39p1kvxn.bkt.clouddn.com/elapse.svg" />
              <span>Coding...</span>
            </a>
          </Link>
          <ul>
          </ul>
          <div className="search">
            <input
              ref="input"
              placeholder="Search..."
              className={ showInput ? 'is-active' : '' }
              onKeyUp={e => this.handleEnter(e)}
            />
            <ClickOutside className="click-outside" onClickOutside={this.hide}>
              <i
                className={ showInput ? 'ion-android-done' : 'ion-android-search' }
                onClick={this.toggleShowInput}
              />
            </ClickOutside>
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
          height: 5rem;
        }

        header::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 2px;
          z-index: 1000;
          color: rgba(0,0,0,.07);
          width: 100%;
          height: 2px;
          box-shadow: 0 2px 3px 0 rgba(0,0,0,.07);
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          height: 100%;
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

        .logo img {
          max-width: 100%;
          height: 40px;
        }
        
        .logo span {
          margin-left: .2rem;
          font-size: 1.1rem;
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
