import { Component } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from './header'
import Footer from './footer'
// import { EProgress } from '../../util/eprogress'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class Layout extends Component {
  constructor() {
    super()
  }

  render() {
    const { activeRoute } = this.props

    return (
      <div className="view-page">
        {/* <Header activeRoute={activeRoute} /> */}
        <main>
        { this.props.children }
        </main>
        <Footer />
        <style jsx>{`
        .view-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        main {
          flex: 1;
          position: relative;
          overflow: auto;
        }
        `}</style>
      </div>
    )
  }
}

export default Layout
