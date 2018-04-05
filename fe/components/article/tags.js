import { Component } from 'react'
import Link from 'next/link'

class Tags extends Component {
  constructor() {
    super()
  }

  render() {
    const { tags } = this.props

    return (
      <div>
        <i className="ion-ios-pricetags" />
        {tags.map((tag, i) => {
          return <Link 
                  as={`/post/tag/${tag.value}`} 
                  href={`/post/tag?tag=${tag.value}`}
                  key={i}
                  >
                  <a>
                    <span>{ tag.title }</span>
                  </a>
                </Link>
        })}
        <style jsx>{`
        div {
          color: #666;
          font-size: 16px;
          margin-top: 2rem;
        }

        a {
          margin-left: 8px;
          position: relative;
        }

        a::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -1px;
          left: 0;
          background-color: #333;
          transform-origin: center;
          transition: transform 0.25s ease-out;
        }
        
        a:hover {
          color: #333;
        }

        a:hover::after {
          transform: scaleX(1);
        }
        `}</style>
      </div>
    )
  }
}

export default Tags
