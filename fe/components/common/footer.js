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
              <a href="https://github.com/mvpzx" target="_blank">
                <i className="ion-social-github"></i>
              </a>
              <a href="mailto:bken2016@163.com" target="_blank">
                <i className="ion-android-mail"></i>
              </a>
            </div>
          </div>
        </footer>
        <style jsx>{`
        footer {
          box-sizing: border-box;
          text-align: center;
          padding: 2rem 0;
          border-top: 1px solid #ebf2f6;
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        a {
          color: #333;
        }

        a + a {
          margin-left: 1.2rem;
        }

        a:hover {
          color: #007fff;
        }

        i {
          font-size: 1.8rem;
        }

        @media (max-width: 768px) {
          .container{
            padding: 0 15px;
          }
        }
        `}</style>
      </div>
    )
  }
}

export default Footer
