import { Component } from 'react'

class LinePanel extends Component {
  constructor() {
    super()
  }

  render() {
    const { title } = this.props

    return (
      <div className="line-panel">
        {
          title ? <span className="line-panel__title">{ title }</span> : ''
        }
        <span className="line-panel__line"></span>
        <style jsx>{`
        .line-panel {
          position: relative;
          z-index: 3;
          height: 22px;

          font-size: 1rem;
        }
    
        .line-panel__title {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 1;
        
          font-weight: 600;
          padding-right: 16px;
          background: #fbfcfc;
        }
        
        .line-panel__line {
          position: absolute;
          top: 50%;
          left: 0;
        
          width: 100%;
          border-bottom: 1px solid #f0f0f0;
        }
        `}</style>
      </div>
    )
  }
}

export default LinePanel


// http://op2clp53n.bkt.clouddn.com/banner.png