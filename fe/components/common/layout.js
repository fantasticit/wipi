import { Component } from 'react'
import Router from 'next/router'
import Header from './header'
import Footer from './footer'
import { EProgress } from '../../util/eprogress'

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
      <div className="view-page">
        <Header />
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
          background: #f5f5f5;
          overflow: auto;
          padding: 3rem 0;
        }
        `}</style>
      </div>
    )
  }
}

export default Layout
