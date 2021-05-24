import React, { useState, useEffect, useMemo, useCallback } from 'react';
import cls from 'classnames';
import { Button, Input, message } from 'antd';
import { CommentProvider } from '@/providers/comment';
import { useToggle } from '@/hooks/useToggle';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { IUser, isValidUser, UserInfo, UserInfoProps } from '../UserInfo';
import { Emoji } from './Emoji';
import styles from './index.module.scss';

const { TextArea } = Input;

interface Props {
  hostId: string;
  parentComment?: IComment;
  replyComment?: IComment;
  onOk?: () => void;
  onClose?: () => void;
  small?: boolean;
}

export const CommentEditor: React.FC<Props> = ({
  hostId,
  parentComment,
  replyComment,
  onOk,
  onClose,
  small,
}) => {
  const [addComment, loading] = useAsyncLoading(CommentProvider.addComment);
  const [needSetInfo, toggleNeedSetInfo] = useToggle(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [content, setContent] = useState('');

  const hasValidUser = useMemo(() => isValidUser(user), [user]);
  const textareaPlaceholder = useMemo(
    () => (replyComment ? `回复${replyComment.name}` : '请输入评论内容（支持 Markerdown）'),
    [replyComment]
  );
  const textareaSize = useMemo(
    () => (small ? { minRows: 4, maxRows: 8 } : { minRows: 6, maxRows: 12 }),
    [small]
  );
  const textareaOnclick = useMemo(() => (hasValidUser ? () => {} : () => toggleNeedSetInfo(true)), [
    hasValidUser,
  ]);
  const btnSize = useMemo(() => (small ? 'small' : 'middle'), [small]);

  const storeUser = useCallback(
    (user) => {
      if (!isValidUser(user)) return;
      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toggleNeedSetInfo();
    },
    [toggleNeedSetInfo]
  );

  const addEmoji = useCallback(
    (emoji) => {
      if (!hasValidUser) {
        toggleNeedSetInfo(true);
        return;
      }
      setContent(`${content}${emoji}`);
    },
    [content, hasValidUser]
  );

  const submit = useCallback(() => {
    const data = {
      hostId,
      ...user,
      content,
      url: window.location.pathname,
    };

    if (parentComment && parentComment.id) {
      Object.assign(data, { parentCommentId: parentComment.id });
    }

    if (replyComment) {
      Object.assign(data, {
        replyUserName: replyComment.name,
        replyUserEmail: replyComment.email,
      });
    }

    addComment(data).then(() => {
      message.success('评论成功，已提交审核');
      setContent('');
      onOk && onOk();
    });
  }, [hostId, parentComment, replyComment, onOk, user, content, toggleNeedSetInfo, addComment]);

  useEffect(() => {
    const userInfo = window.localStorage.getItem('user');
    try {
      const user = JSON.parse(userInfo) as IUser;
      setUser(user);
    } catch (err) {}
  }, []);

  return (
    <div className={cls(styles.wrapper)}>
      <UserInfo
        {...({
          visible: needSetInfo,
          onCancel: toggleNeedSetInfo,
          onOk: storeUser,
        } as UserInfoProps)}
      />
      <TextArea
        placeholder={textareaPlaceholder}
        autoSize={textareaSize}
        value={content}
        onChange={(e) => hasValidUser && setContent(e.target.value)}
        onClick={textareaOnclick}
      />
      <footer>
        <Emoji onClick={addEmoji} />
        <div>
          {onClose && (
            <Button onClick={onClose} style={{ marginRight: 16 }} size={btnSize}>
              收起
            </Button>
          )}
          <Button
            loading={loading}
            onClick={submit}
            type="primary"
            disabled={!content}
            size={btnSize}
          >
            发布
          </Button>
        </div>
      </footer>
    </div>
  );
};
