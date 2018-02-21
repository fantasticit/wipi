import { Component } from 'react'
import Header from './header'

class Layout extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />
        <main>
        { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout
