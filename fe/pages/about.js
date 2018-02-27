import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { highlight } from '../util/highlight'
import { formatTime } from '../util/format-time'
import ArticleService from '../service/article'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'

class About extends Component {
  static async getInitialProps() {
    return {}
  }


  render() {
    const { slogan, contacts } = this.props

    return(
      <Layout>
        <div className="container">
          <h1>关于我</h1>
          <p>{ slogan }</p>
          {contacts.map((contact, i) => (
            <div className="contact" key={i}>
              <a href={contact.path} target="blank">
                <div>{ contact.title }</div>
                <div>{ contact.icon }</div>
                <div>{ contact.name }</div>
              </a>
            </div>
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
