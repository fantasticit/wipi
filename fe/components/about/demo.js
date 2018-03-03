import { Component } from 'react'

class Demo extends Component {
  constructor() {
    super()
  }

  render() {
    const { demo } = this.props

    return (
      <div className="demo">
        <div className="demo-header">
          <img src={demo.cover} alt="" />
        </div>
        <div className="demo-content">
          <h3>{ demo.title }</h3>
          <p>{ demo.desc }</p>
        </div>
        <div className="demo-footer">
          <div className="demo-tags">
            {demo.tags.map((tag, i) => (
              <span className="tag" key={i}>{ tag }</span>
            ))}
          </div>
          <div className="demo-btn">
            <a href={demo.url} target="_blank">预览地址</a>
          </div>
        </div>
        <style jsx>{`
        .demo {
          width: 32%;
          box-sizing: border-box;
          display: inline-block;
          border: 1px solid #eee;

          transition: all ease .2s;
        }

        .demo:hover {
          box-shadow: 0 5px 20px rgba(0,0,0,.1);
        }

        .demo + .demo {
          margin-left: 2%;
        }

        .demo-header {
          transition: all ease .5s;
          height: 200px;
        }

        .demo-header img {
          width: 100%;
          height: 100%;
        }

        .demo-content {
          padding: 1rem;
        }

        .demo-content p {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        } 

        .demo-footer {
          padding: 0 1rem 1rem 1rem;
        }

        .demo-tags {
          margin: 1rem 0;
        }

        .tag {
          display: inline;
          padding: .2em .6em .3em;
          font-size: 75%;
          font-weight: 700;
          line-height: 1;
          color: #337ab7;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: .25em;
        }

        .demo-footer a {
          display: block;
          padding: 5px 10px;
          text-decoration: none;
          background: rgba(88,183,255, .1);
          color: rgb(88,183,255);
          border-width: 1px;
          border-style: solid;
          border-color: rgba(88,183,255, .3);
          border-radius: 5px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .demo {
            width: 98%;
            margin-left: 1%;
          }

          .demo + .demo {
            margin-top: 1.5rem;
            margin-left: 1%;
          }
        }
        `}</style>
      </div>
    )
  }
}

export default Demo
