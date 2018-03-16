import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import Author from '../components/about/author'
import Site from '../components/about/site'
import Demo from '../components/about/demo'

class About extends Component {
  static async getInitialProps() {
    return {}
  }

  componentDidMount() {
    window.title = `关于 | Mvpzx`
  }

  render() {
    const { slogan, contacts, demos } = this.props

    return(
      <Layout activeRoute={'/about'}>
        <div className="container">
          <Author />
          <Site />
          <Demo demos={demos} />
        </div>
        <style jsx>{`
          .container {
            padding-bottom: 3rem;
            font-size: 16px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 15px 3rem 15px;
            }
          }

          .box {
            padding: 1rem 0;
          }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = ({ author }) => ({
  slogan: author.slogan,
  contacts: author.contactMe,
  demos: author.demos
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(About)
