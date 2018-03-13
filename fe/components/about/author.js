import { Component } from 'react'
import LinePanel from '../common/line-panel'

class Author extends Component {
  render() {
    return (
      <div>
        <LinePanel title={'关于本人'} />
        <ul>
          <li>汉子，安徽人，在武汉读书（18年读完）</li>
          <li>兴趣不广不泛，只想活得豁达有意义</li>
          <li>想做后端，不爱做前端，但是还是前端</li>
          <li>
            <span>Gayhub: </span>
            <a href="https://github.com/mvpzx">
              <i className="ion-social-github" />
            </a>
          </li>
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

export default Author
