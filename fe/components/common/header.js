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
        <Link href={'/post'}>
          <a className="logo">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" height="20" />
            <span>Elapse</span>
          </a>
        </Link>
        <div className="search">
          <input
            ref="input"
            className={ showInput ? 'is-active' : '' }
            onKeyUp={e => this.handleEnter(e)}
          />
          <i
            className="ion-android-search"
            onClick={() => this.toggleShowInput()}
          />
        </div>
        <style jsx>{`
        header {
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 250;
          height: 5rem;
          color: #909090;
          background: #fff;
          
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          overflow: hidden;
        }

        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .logo span {
          margin-left: .6rem;
          font-size: 1.6rem;
        }

        .search {
          position: relative;
          width: 12rem;
          height: 2rem;
          line-height: 2rem;
          overflow: hidden;
          font-size: 1rem;
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
          width: 100%;
          height: 100%;
          transition: all ease .3s;
        }

        .search input.is-active {
          right: 0;
        }
        `}</style>
      </header>
    )
  }
}

export default Header
