import React from 'react';
import cls from 'classnames';
import { ShareProps, Share } from '@/components/Share';
import { CommentIcon } from '@/components/Comment/CommentIcon';
import { LikesProps, Likes } from '@/components/Likes';
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
  minHeight = '100%',
  background = 'var(--bg-body)',
  likesProps,
  showComment = false,
  shareProps,
}) => {
  return (
    <div className={cls(style.outerWrap)} style={{ minHeight, background }}>
      <div className={cls('container')}>
        <div className={style.wrap}>
          <div className={cls(style.fixed)}>
            {likesProps && <Likes {...likesProps} />}
            {showComment && (
              <div className={style.iconWrap}>
                <CommentIcon />
              </div>
            )}
            {shareProps && (
              <div className={style.iconWrap}>
                <Share {...shareProps} />
              </div>
            )}
          </div>
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
