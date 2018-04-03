import { Component } from 'react'
import { highlight } from '../../util/highlight'

class Markdown extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const oContent = this.refs.content

    highlight(oContent)
  }

  render() {
    const { content } = this.props

    return (
      <div
        ref="content"
        className="markdown"
        style={{'marginTop': '1rem'}}
        dangerouslySetInnerHTML={{__html: content}}>
      </div>
    )
  }
}

export default Markdown
