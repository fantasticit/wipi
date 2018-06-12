import { Component } from 'react'

class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <footer>
          <div className="container">
            <div>&copy; {new Date().getFullYear()} 皖ICP备18005737号</div>
            <div>
              <a href="https://github.com/hyiron" target="_blank">
                <i className="ion-social-github" />
              </a>
              <a href="mailto:bken2016@163.com" target="_blank">
                <i className="ion-android-mail" />
              </a>
              <a href="/rss.xml" target="_blank">
                <i className="ion-social-rss" />
              </a>
            </div>
          </div>
        </footer>
        <style jsx>{`
          footer {
            box-sizing: border-box;
            text-align: center;
            padding: 2rem 0;
            background: #2c3033;
            color: #fff;
          }

          .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          a {
            color: #a0a2a5;
            transition: color ease 0.2s;
          }

          a:hover {
            color: #fff;
          }

          a + a {
            margin-left: 1.2rem;
          }
          i {
            font-size: 1.8rem;
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 15px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Footer
