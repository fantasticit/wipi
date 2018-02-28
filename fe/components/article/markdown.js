import { Component } from 'react'
import { highlight } from '../../util/highlight'
import './styles/tags.scss'
import './styles/markdown.scss'

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
        className="markdown-body"
        dangerouslySetInnerHTML={{__html: content}}>
      </div>
    )
  }
}

export default Markdown
