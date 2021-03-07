import React from 'react';
import cls from 'classnames';
import style from './index.module.scss';

export const DoubleColumnLayout = ({
  leftNode,
  leftClassName = null,
  rightNode,
  rightClassName = null,
  isRightNodeMobileHidden = true,
  minHeight = '100%',
  background = 'var(--bg-body)',
}) => {
  return (
    <div className={cls(style.outerWrap)} style={{ minHeight, background }}>
      <div className={cls('container')}>
        <div className={style.wrap}>
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
