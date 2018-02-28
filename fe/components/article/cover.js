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
          overflow: hidden;
        }

        .cover img {
          max-width: 100%;
        }
        `}</style>
      </div>
    )
  }
}

export default Cover
