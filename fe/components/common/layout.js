import { Component } from 'react'
import Router from 'next/router'
import Header from './header'
import Footer from './footer'
// import { EProgress } from '../../util/eprogress'

// Router.onRouteChangeStart = () => EProgress.start()
// Router.onRouteChangeComplete = () => EProgress.close()
// Router.onRouteChangeError = () => EProgress.close()

class Layout extends Component {
  constructor() {
    super()
  }

  render() {
    const { activeRoute } = this.props

    return (
      <div className="view-page">
        <Header activeRoute={activeRoute} />
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
          padding: 3rem 0;
        }
        `}</style>
      </div>
    )
  }
}

export default Layout
