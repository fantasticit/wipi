import { Component } from 'react'
import Header from './header'
import { EProgress } from '../../util/eprogress'
import Router from 'next/router'

Router.onRouteChangeStart = () => {
  console.log(1)
  EProgress.start()
}
Router.onRouteChangeComplete = () => {
  console.log(2)
  EProgress.close()
}

Router.onRouteChangeError = () => {
  console.log(3)
  EProgress.close()
}

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
