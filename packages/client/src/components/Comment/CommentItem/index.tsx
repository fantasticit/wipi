import React, { useCallback, useEffect, useMemo } from 'react';
import cls from 'classnames';
import { Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { ConditionTransition } from '@/components/Animation/Transition';
import { Opacity } from '@/components/Animation/Opacity';
import { LocaleTime } from '@/components/LocaleTime';
import { getRandomColor } from '@/utils';
import { useToggle } from '@/hooks/useToggle';
import { CommentEditor } from '../CommentEditor';
import styles from './index.module.scss';

type Props = {
  comment: IComment;
  parentComment?: IComment;
  isChild: boolean;
};

export const CommentItem: React.FC<Props> = ({ comment, parentComment, isChild = false }) => {
  const [editorVisible, toggleEditorVisible] = useToggle(false);
  const avatarSize = useMemo(() => (isChild ? 24 : 32), [isChild]);
  const paddingHorizontal = useMemo(() => avatarSize + 8, [avatarSize]);

  return (
    <div
      className={cls({
        [styles.commentItem]: true,
        [styles.isParent]: !isChild,
        [styles.isChild]: isChild,
      })}
    >
      <header>
        <Avatar size={avatarSize} style={{ backgroundColor: getRandomColor(comment.name) }}>
          {('' + comment.name).charAt(0).toUpperCase()}
        </Avatar>
        <span className={styles.name}>
          <strong>{comment.name}</strong>
          {comment.replyUserName ? (
            <>
              <span style={{ margin: '0 8px' }}>回复</span>
              <strong className={styles.replyUser}>{comment.replyUserName}</strong>
            </>
          ) : null}
        </span>
      </header>
      <main style={{ padding: `12px ${paddingHorizontal}px` }}>
        <div dangerouslySetInnerHTML={{ __html: comment.html || comment.content }} />
      </main>
      <footer style={{ padding: `0 ${paddingHorizontal}px` }}>
        <div className={styles.meta}>
          {comment.userAgent ? (
            <span>
              {comment.userAgent}
              {' · '}
            </span>
          ) : null}
          <LocaleTime date={comment.createAt} timeago></LocaleTime>
          <span className={styles.reply} onClick={toggleEditorVisible}>
            <MessageOutlined style={{ marginRight: 4 }} />
            回复
          </span>
        </div>
        <ConditionTransition
          visible={editorVisible}
          options={{
            from: { opacity: 0, height: 0 },
            enter: { opacity: 1, height: 155 },
            leave: { opacity: 0, height: 0 },
          }}
        >
          <div className={styles.editorWrapper}>
            <CommentEditor
              small
              hostId={comment.hostId}
              parentComment={parentComment}
              replyComment={comment}
              onOk={toggleEditorVisible}
              onClose={toggleEditorVisible}
            />
          </div>
        </ConditionTransition>
        {comment.children && (
          <div>
            <Comments comments={comment.children} parentComment={comment} isChild={true} />
          </div>
        )}
      </footer>
    </div>
  );
};

export const Comments = ({ comments, parentComment = null, isChild = false }) => {
  return (
    <>
      {comments.map((comment) => {
        const component = (
          <CommentItem
            comment={comment}
            parentComment={parentComment || comment}
            isChild={isChild}
          />
        );
        return isChild ? <Opacity>{component}</Opacity> : component;
      })}
    </>
  );
};
