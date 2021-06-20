import React, { useEffect } from 'react';
import cls from 'classnames';
import { ShareProps, Share } from '@/components/Share';
import { CommentIcon } from '@/components/Comment/CommentIcon';
import { LikesProps, Likes } from '@/components/Likes';
import { useToggle } from '@/hooks/useToggle';
import { getDocumentScrollTop } from '@/utils';
import style from './index.module.scss';

interface IProps {
  leftNode: React.ReactNode;
  leftClassName?: null | string;
  rightNode: React.ReactNode;
  rightClassName?: null | string;
  isRightNodeMobileHidden?: boolean;
  minHeight?: string | number;
  background?: string;
  likesProps?: LikesProps;
  showComment?: boolean;
  shareProps?: ShareProps;
}

export const DoubleColumnLayout: React.FC<IProps> = ({
  leftNode,
  leftClassName = null,
  rightNode,
  rightClassName = null,
  isRightNodeMobileHidden = true,
  minHeight = '100vh',
  background = 'var(--bg-body)',
  likesProps,
  showComment = false,
  shareProps,
}) => {
  const [showWidge, toggleWidge] = useToggle(true);

  useEffect(() => {
    let beforeY = 0;
    let y = 0;
    const handler = () => {
      y = getDocumentScrollTop();
      toggleWidge(beforeY <= y);
      setTimeout(() => {
        beforeY = y;
      }, 0);
    };
    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, [toggleWidge]);

  return (
    <div className={cls(style.outerWrap)} style={{ minHeight, background }}>
      <div className={cls('container')}>
        <div className={style.wrap}>
          {(likesProps || showComment || shareProps) && (
            <div
              className={cls(style.fixed, showWidge && style.active)}
              onClick={(e) => {
                console.log('clicked');
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                e.stopPropagation();
              }}
            >
              {likesProps && (
                <div className={style.widgetWrapper}>
                  <Likes {...likesProps} />
                </div>
              )}
              {showComment && (
                <div className={style.widgetWrapper}>
                  <CommentIcon />
                </div>
              )}
              {shareProps && (
                <div className={style.widgetWrapper}>
                  <Share {...shareProps} />
                </div>
              )}
            </div>
          )}

          <section className={cls(style.left, leftClassName)}>{leftNode}</section>
          <aside
            className={cls(
              style.right,
              rightClassName,
              isRightNodeMobileHidden && style.isRightNodeMobileHidden
            )}
          >
            {rightNode}
          </aside>
        </div>
      </div>
    </div>
  );
};
