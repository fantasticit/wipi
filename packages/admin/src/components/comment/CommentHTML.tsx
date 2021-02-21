import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export const CommentHTML = ({ comment }) => {
  const [visibel, setVisibel] = useState(false);

  return (
    <span>
      <Button
        type="link"
        style={{ paddingLeft: 0 }}
        onClick={() => {
          setVisibel(true);
        }}
      >
        查看内容
      </Button>
      <Modal
        title={'评论详情-HTML 内容'}
        visible={visibel}
        footer={null}
        onCancel={() => {
          setVisibel(false);
        }}
      >
        <div
          className="markdown"
          dangerouslySetInnerHTML={{
            __html: comment && comment.html,
          }}
        ></div>
      </Modal>
    </span>
  );
};
