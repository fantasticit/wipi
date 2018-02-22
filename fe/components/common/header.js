import { Component } from 'react'
import Link from 'next/link'
import './styles/header.scss'

const links = [
  {
    title: '首页',
    path: '/p/',
  },

  // {
  //   title: '前端',
  //   path: '/fe',
  // },

  // {
  //   title: '关于',
  //   path: '/about',
  // },

]

class Header extends Component {
  render() {
    return(
      <div className='el-header'>
        <header>
          <div className="container">
            <Link href="/p">
              <a className="el-header__logo">Logo</a>
            </Link>
            <nav>
              <ul className="el-header__menu">
                {links.map((link, i) => (
                  <li className="el-header__menu-item" key={i}>
                    <Link href={link.path}>
                      <a>{ link.title }</a>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="el-header__search">
                <div className="form-control form-control--icon">
                  <input className="el-input" placeholder="搜索文章"/>
                  <span></span>
                </div>
                <button className="el-button el-button--primary">写文章</button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    )
  }
}

export default Header
