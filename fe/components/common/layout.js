import { Component } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import initReactFastclick from 'react-fastclick'
import Header from './header'
import Footer from './footer'
import '../../theme/global.scss'

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

initReactFastclick()

class Layout extends Component {
  constructor() {
    super()
  }

  render() {
    const { activeRoute, noFooter = false } = this.props

    return (
      <div className="view-page">
        <Header activeRoute={activeRoute} />
        <main>{this.props.children}</main>
        {noFooter ? '' : <Footer />}
        <style jsx>{`
          .view-page {
            display: flex;
            flex-direction: column;
          }

          main {
            position: relative;
            overflow: auto;
          }
        `}</style>
      </div>
    )
  }
}

export default Layout
