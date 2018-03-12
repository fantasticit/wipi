import { Component } from 'react'

class Cover extends Component {
  constructor() {
    super()
  }

  render() {
    const { cover } = this.props

    return (
      <div className="cover">
        <img src={cover} />
        <style jsx>{`
        .cover {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .cover img {
          width: 100%;
          height: auto;
          max-height: 80vh;
        }
        `}</style>
      </div>
    )
  }
}

export default Cover
