import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import './styles/nav.scss'

class Nav extends Component {
  constructor() {
    super()
  }

  render() {
    const { classifies = [] } = this.props

    return(
      <nav className="el-nav">
        <div className="container">
          <ul className="el-nav__menu">
            {classifies.map((classify, i) => (
              <li key={i} className='el-nav__menu-item'>
                <Link as={`/p/${classify.value}`} href={`/post?id=${classify.value}`}>
                  <a>{ classify.title }</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ classifies }) => ({ classifies })

export default connect(mapStateToProps, null)(Nav)
