import { Component } from 'react'
import ReactSwipe from 'react-swipe'

const swipeOptions = {
  startSlide: 0,
  auto: 3,
  speed: 12000,
  disableScroll: true,
  continuous: true,
}

class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    const { title } = this.props

    return (
      <div className="container" ref="swiper">
        <ReactSwipe className="carousel" swipeOptions={swipeOptions}>
          <div><img src="http://ownsprds9.bkt.clouddn.com/star_wars.jpg" /></div>
          <div><img src="http://ovqfmaiul.bkt.clouddn.com/sunset_vector_art_dribbble.png" /></div>
        </ReactSwipe>
        <style jsx>{`
        .container {
          position: relative;
          
          box-sizing: border-box;
          height: 340px;
          margin: 20px auto;
          overflow: hidden;
        }

        img {
          width: 100%;
          height: auto;
          max-height: 340px;
        }

        @media only screen and (max-device-width: 768px) {
          .container {
            height: 180px;
          }

          img {
            max-height: 180px;
          }
        }
        `}</style>
      </div>
    )
  }
}

export default Carousel
