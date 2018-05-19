import { Component } from 'react'
import throttle from '../../util/throttle'
import LinePanel from '../common/line-panel'

class Toc extends Component {
  constructor() {
    super()
    this.state = {
      activeIndex: '' // 监听页面滚动后才可得出当前所在位置
    }
  }

  handleToc = () => {
    let toc = this.props.toc
    let offsetTops = toc.map(item => {
      let oHeader = document.querySelector(`#${item.anchor}`)
      return (oHeader && oHeader.offsetTop) || 0
    })
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight

    function minDiffrence() {
      // 最小差值
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let data = offsetTops.map(offsetTop => {
        return Math.abs(offsetTop - scrollTop)
      })

      return data.indexOf(Math.min.apply(null, data))
    }

    let activeIndex = minDiffrence()
    let oTocItem = this.refs['item' + activeIndex]
    this.setState({ activeIndex })
    // oTocItem && oTocItem.scrollIntoView()
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleToc, 160), false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleToc, false)
  }

  render() {
    const { activeIndex = '' } = this.state
    const { toc = [] } = this.props

    return (
      <div>
        <LinePanel title={'文章目录'} />
        <ul>
          {toc.map((item, i) => (
            <li
              key={i}
              ref={'item' + i}
              className={activeIndex === i ? 'is-active' : ''}
              onClick={() => setTimeout(this.setState({ activeIndex: i }), 210)}
            >
              <a
                className={'level-' + item.level}
                href={'#' + item.anchor}
                style={{ marginLeft: (item.level - 1) * 15 + 'px' }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <style jsx>{`
          div {
            overflow: hidden;
            width: 240px;
          }

          ul {
            position: relative;
            max-height: 240px;
            overflow: auto;
            overflow-y: hidden;
            font-size: 0;
          }

          ul::-webkit-scrollbar {
            width: 0;
          }

          li {
            margin: 0;
            font-weight: 500;
            color: #000;
            font-size: 1rem;
            list-style: none;
            padding-left: 10px;
            border-left: 1px solid #ebedef;
            transition: all ease 0.3s;
            overflow: hidden;
          }

          li.is-active,
          li:hover {
            color: #007fff;
          }

          li.is-active {
            background-color: #ebedef;
            border-left: 2px solid #007fff;
          }

          li a {
            position: relative;
            display: inline-block;
            color: inherit;
            padding: 4px 0 4px 21px;
            line-height: 1.5;
            vertical-align: middle;
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
            border-radius: 50%;

            width: 4px;
            height: 4px;
            background-color: currentColor;
          }
        `}</style>
      </div>
    )
  }
}

export default Toc
