import { Component } from 'react';
import throttle from '../../util/throttle'

class Toc extends Component {
  constructor() {
    super()
    this.state = {
      activeIndex: '', // 监听页面滚动后才可得出当前所在位置
    };
  }

  componentDidMount() {
    let toc = this.props.toc;
    let offsetTops = toc.map(item => {
      let oHeader =  document.querySelector(`#${item.anchor}`)
      return oHeader && oHeader.offsetTop || 0
    })

    function minDiffrence(num) { // 最小差值
      let diffrences = offsetTops.map(offset => Math.abs(offset - num))
      return diffrences.indexOf(Math.min.apply(null, diffrences))
    }
    
    window.addEventListener('scroll', throttle(() => {
      let scrollTop = document.documentElement.scrollTop ||
                      document.body.scrollTop;
      this.setState({ activeIndex: minDiffrence(scrollTop) });
    }, 200), false)
  }

  render() {
    const { activeIndex = '' } = this.state;
    const { toc = [] } = this.props;

    return (
      <div>
        <p>目录</p>
        <ul>
          {toc.map((item, i) => (
            <li key={i} className={activeIndex === i ? 'is-active' : ''}
              onClick={() => setTimeout(() => {
                this.setState({ activeIndex: i })
              }, 210)}>
              <a className={'anchor-' + item.level} href={'#' + item.anchor}>{item.title}</a>
            </li>
          ))}
        </ul>
        <style jsx>{`
        div {
          position: fixed;
        }

        ul {
          position: relative;
        }

        ul::before {
          content: "";
          position: absolute;
          top: 0;
          left: 1px;
          bottom: 0;
          width: 2px;
          background-color: #ebedef;
          opacity: .5;
        }

        li {
          font-weight: 500;
          color: #000;
          font-size: 1.167rem;
          line-height: 1.3;
          list-style: none;
          transition: all ease .3s;
        }

        li.is-active, li:hover {
          color: #007fff;
        }

        li.is-active {
          background-color: #ebedef;
        }

        li a {
          position: relative;
          display: block;
          color: inherit;
          margin: 6px 0;
          padding: 4px 0 4px 21px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        li a::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -50%);

          width: 4px;
          height: 4px;
          background-color: currentColor;
          border-radius: 50%;
        }
        `}</style>
      </div>
    )
  }
}

export default Toc
