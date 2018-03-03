import { Component } from 'react'
import { initStore } from '../redux/store'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Layout from '../components/common/layout'
import Backtop from '../components/common/backtop'
import Contact from '../components/about/contact'
import Banner from '../components/about/banner'
import Demo from '../components/about/demo'

class About extends Component {
  static async getInitialProps() {
    return {}
  }

  render() {
    const { slogan, contacts, demos } = this.props

    return(
      <Layout activeRoute={'/about'}>
        <Banner />
        <div className="container">
          <Tabs>
            <TabList>
              <Tab>
                <i className="fa fa-user-secret"></i>
                <span>联系方式</span>
              </Tab>
              <Tab>
                <i className="fa fa-bug"></i>
                <span>练习Demo</span>
              </Tab>
            </TabList>
        
            <TabPanel>
              {contacts.map((contact, i) => (
                <Contact key={i} info={contact} />
              ))}
            </TabPanel>
            <TabPanel>
              {demos.map((demo, i) => (
                <Demo key={i} demo={demo} />
              ))}
            </TabPanel>
          </Tabs>
        </div>
        <style jsx>{`
          .container {
            padding-bottom: 3rem;
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
