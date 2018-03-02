import { Component } from 'react'

class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <footer>
          <p>&copy; {new Date().getFullYear()} - Mvpzx 的小站 - 皖 ICP 备 15896352 号</p>
          <p>
            Powered by 
            <a href="https://koa.bootcss.com"> Koa </a>
            &
            <a href="http://www.css88.com/react/"> React</a>
          </p>
        </footer>
        <style jsx>{`
        footer {
          text-align: center;
          padding: 2rem 0;
          border-top: 1px solid #ebf2f6;
        }
        `}</style>
      </div>
    )
  }
}

export default Footer
