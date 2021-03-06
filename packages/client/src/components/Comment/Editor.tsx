import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import cls from 'classnames';
import { CommentProvider } from '@/providers/comment';
import style from './index.module.scss';

const regexp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
const { TextArea } = Input;

type IUser = {
  name?: string;
  email?: string;
};

export const Editor = ({
  hostId,
  parentComment,
  replyComment,
  renderFooter = null,
  onSuccess = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    let userInfo = window.localStorage.getItem('user');

    try {
      userInfo = JSON.parse(userInfo);
      setName((userInfo as IUser).name);
      setEmail((userInfo as IUser).email);
    } catch (err) {}
  }, [loading]);

  const submit = () => {
    if (!regexp.test(email)) {
      message.info('输入合法邮箱地址，以便在收到回复时邮件通知');
    }

    const data = {
      hostId,
      name,
      email,
      content,
      url: window.location.pathname,
    };

    // 父级评论 id
    if (parentComment) {
      if (parentComment.id) {
        Object.assign(data, { parentCommentId: parentComment.id });
      }
    }

    // 回复评论信息
    if (replyComment) {
      Object.assign(data, {
        replyUserName: replyComment.name,
        replyUserEmail: replyComment.email,
      });
    }

    setLoading(true);
    CommentProvider.addComment(data)
      .then(() => {
        message.success('评论成功，已提交审核');
        setContent('');
        const userInfo = { name, email };
        try {
          window.localStorage.setItem('user', JSON.stringify(userInfo));
        } catch (err) {}
        setLoading(false);
        onSuccess();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className={cls(style.editor)}>
      <div>
        <TextArea
          placeholder="请输入评论内容（可输入 Markerdown 语法内容）"
          autoSize={{ minRows: 3 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={style.nameAndMail}>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="请输入您的称呼"
          />
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="请输入您的邮箱（不会公开，您也可以选择不输入）"
          />
        </div>
      </div>
      <div className={style.footer}>
        {renderFooter ? (
          renderFooter({
            loading,
            submit,
            disabled: !name || !email || !content,
          })
        ) : (
          <Button
            loading={loading}
            onClick={submit}
            type="primary"
            disabled={!name || !email || !content}
          >
            评论
          </Button>
        )}
      </div>
    </div>
  );
};
