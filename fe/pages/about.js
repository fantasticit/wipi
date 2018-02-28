import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { highlight } from '../util/highlight'
import { formatTime } from '../util/format-time'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import Contact from '../components/about/contact'

class About extends Component {
  static async getInitialProps() {
    return {}
  }

  render() {
    const { slogan, contacts } = this.props

    return(
      <Layout activeRoute={'/about'}>
        <div className="container">
          <h2>关于作者</h2>
          <p>{ slogan }</p>
          <h2>联系作者</h2>
          {contacts.map((contact, i) => (
            <Contact key={i} info={contact} />
          ))}
          <Backtop />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ author }) => ({
  slogan: author.slogan,
  contacts: author.contactMe
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(About)
