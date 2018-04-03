import { Component } from 'react'

class Comment extends Component {
  constructor() {
    super()
  }

  renderGitalk = () => {
    if (!window || !window.Gitalk) {
      return
    }

    const gitalk = new Gitalk({
      clientID: 'a66db756e74c2d554722',
      clientSecret: 'c7f17db5a023e29d8594f34cef58df96842f037c',
      repo: 'elapse',
      owner: 'mvpzx',
      admin: ['mvpzx'],
      id: this.props.articleId,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false     // Facebook-like distraction free mode
    })
    
    gitalk.render(this.refs['comment'])
  }

  componentDidMount() {
    this.renderGitalk();
  }

  componentDidUpdate() {
    this.renderGitalk();
  }

  render() {
    const { articleId } = this.props

    return (
      <div ref="comment" className="comment">
        <style jsx>{`
        .comment {
          min-height: 1px;
        }
        `}</style>
      </div>
    )
  }
}

export default Comment
