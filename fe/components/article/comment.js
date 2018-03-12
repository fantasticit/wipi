import { Component } from 'react'

class Comment extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="comment">
        <div id="uyan_frame"></div>
        {/* <div className="el-comment__title">
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
        </div> */}
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
