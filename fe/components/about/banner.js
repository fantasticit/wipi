import { Component } from 'react'

class Banner extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="container">
        <div className="bg">
          <img src="http://ownsprds9.bkt.clouddn.com/154d8d96dd16f14c108d4805bcb6683d.jpg" />
        </div>
        <div className="wrapper"></div>
        <div className="info">
          <i className="fa fa-user"></i>
          <span>关于作者</span>
        </div>
        <style jsx>{`
        .container {
          position: relative;
          box-sizing: border-box;
          height: 100px;
          margin: 20px auto;
          border-radius: 6px;
        }

        .bg, .wrapper, .info {
          position: absolute;
          left: 0;
          top: 0;
          
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 6px;
        }

        .bg img {
          width: 100%;
          height: auto;
        }

        .wrapper {
          z-index: 1;
          background: rgba(250, 189, 61, .8);
        }

        .info {
          z-index: 2;
          
          padding-left: 2rem;
          color: #fff;
          font-weight: 600;
          font-size: 30px;

          line-height: 100px;
        }

        .info i {
          margin-right: 1rem;
        }

        @media (max-width: 768px) {
          .container,
          .bg, 
          .wrapper, 
          .info {
            border-radius: 0;
          }
        }
        `}</style>
      </div>
    )
  }
}

export default Banner
