import React from 'react';
import cls from 'classnames';
import { ShareProps, Share } from '@components/Share';
import style from './index.module.scss';

interface IProps {
  leftNode: React.ReactNode;
  leftClassName?: null | string;
  rightNode: React.ReactNode;
  rightClassName?: null | string;
  isRightNodeMobileHidden?: boolean;
  minHeight?: string | number;
  background?: string;
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
  shareProps,
}) => {
  return (
    <div className={cls(style.outerWrap)} style={{ minHeight, background }}>
      <div className={cls('container')}>
        <div className={style.wrap}>
          <div className={cls(style.fixed)}>{shareProps && <Share {...shareProps} />}</div>
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
