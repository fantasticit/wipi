import React, { Component } from 'react'

export default class ClickOutside extends Component {
  constructor(props) {
    super(props)
    this.isTouch = false
  }

  render() {
    const { children, onClickOutside, ...props } = this.props
    return (
      <div {...props} ref="container">{children}</div>
    )
  }

  handle = e => {
    if (e.type === 'touchend') {
      this.isTouch = true
    }

    if (e.type === 'click' && this.isTouch) {
      return
    }

    const { onClickOutside } = this.props
    const container = this.refs['container']

    if (!container.contains(e.targer || e.srcElement)) {
      onClickOutside(e)
    }
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true)
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true)
    document.removeEventListener('click', this.handle, true)
  }
}
