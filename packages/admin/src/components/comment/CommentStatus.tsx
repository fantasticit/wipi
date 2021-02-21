import React from 'react';
import { Badge } from 'antd';

export const CommentStatus = ({ comment }) => {
  return (
    <Badge color={!comment.pass ? 'gold' : 'green'} text={!comment.pass ? '未通过' : '通过'} />
  );
};
