import { Component } from 'react'

class Contact extends Component {
  constructor() {
    super()
  }

  render() {
    const { path, title, icon, name } = this.props.info

    console.log(this.props.info)

    return (
      <div className="contact-box">
        <a href={path} target="_blank">
          <div>{title}</div>
          <div className="icon"><i className={'fa fa-' + icon}></i></div>
          <div>{name}</div>
        </a>
        <style jsx>{`
        .contact-box {
          display: inline-block;
          width: 20rem;
          background: #fff;
          text-align: center;
          font-size: 1.4rem;
          background: #f7f7f7;
          border: 1px solid #eee;
        }

        .contact-box + .contact-box {
          margin-left: 1.5rem;
        }

        .contact-box > a {
          display: block;
          padding: 1rem;
        }

        .contact-box > a > div {
          margin-top: .8rem;
        }

        .icon {
          padding: 2rem 0;
          font-size: 5rem;
        }

        @media (max-width: 768px) {
          .contact-box {
            width: 96%;
            margin-left: 2%;
          }

          .contact-box + .contact-box {
            margin-top: 1.5rem;
            margin-left: 2%;
          }
        }
        `}</style>
      </div>
    )
  }
}

export default Contact
