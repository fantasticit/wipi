import { Component } from 'react'

class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <footer>
          {/* - 皖 ICP 备 15896352 号 */}
          <p>&copy; {new Date().getFullYear()} - Mvpzx 的小站</p>
          <p>
            Powered by 
            <a href="https://koa.bootcss.com" target="_blank"> Koa </a>
            &
            <a href="http://www.css88.com/react/" target="_blank"> React</a>
          </p>
        </footer>
        <style jsx>{`
        footer {
          box-sizing: border-box;
          text-align: center;
          height: 10rem;
          padding: 2rem 0;
          border-top: 1px solid #ebf2f6;
        }

        a {
          color: #409efe;
        }

        a:hover {
          text-decoration: underline;
        }
        `}</style>
      </div>
    )
  }
}

export default Footer
