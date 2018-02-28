import { Component } from 'react'
import './styles/comment.scss'

class Comment extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="el-comment">
        <div className="el-comment__title">
          <span className="comment-num">0 条评论</span>
          <span className="comment-line"></span>
        </div>
        <div className="el-comment__editor">
          <div className="editor">
            <textarea className="el-textarea" />
          </div>
          <div className="btn-group">
            <button className="el-button el-button--text">取消</button>
            <button className="el-button">评论</button>
          </div>
        </div>
        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

export default Comment
