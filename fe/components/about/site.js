import { Component } from 'react'
import LinePanel from '../common/line-panel'

class Site extends Component {
  render() {
    return (
      <div>
        <LinePanel title={'关于本站'} />
        <ul>
          <li>前台：React.js + Redux + next.js</li>
          <li>后台：Vue.js</li>
          <li>服务：koa + mongodb</li>
          <li>主题：模仿或参考了nextjs官网、知乎、简书以及掘金等等</li>
        </ul>
        <style jsx>{`
        ul {
          padding: 1.2rem 3rem;
        }

        li + li {
          margin-top: 1rem;
        }
        `}</style>
      </div>
    )
  }
}

export default Site
