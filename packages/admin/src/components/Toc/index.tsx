import React, { useCallback } from 'react';
import cls from 'classnames';
import { isOdd } from '@/utils';
import style from './index.module.scss';

interface IToc {
  level: number;
  id: string;
  text: string;
}

export const Toc: React.FC<{ tocs: Array<IToc>; maxHeight?: string | number }> = ({
  tocs = [],
}) => {
  const goto = useCallback((toc) => {
    try {
      const el = document.getElementById(toc.id);
      if (el) {
        el.scrollIntoView();
      }
    } catch (e) {} // eslint-disable-line no-empty
  }, []);

  return (
    <div className={style.wrapper}>
      <div>
        {tocs.map((toc, idx) => {
          const v = toc.level;
          const f = isOdd(v - 1);
          return (
            <div
              key={`js-toc-` + idx}
              className={cls(style.item)}
              id={`js-toc-` + idx}
              style={
                {
                  'paddingLeft': 12 * (v - 1),
                  'cursor': 'pointer',
                  '--dot-left': 10 * (v - 2) + 'px',
                  '--dot-width': 6 - (v - 1) + (f ? 1 : 0) + 'px',
                } as React.CSSProperties
              }
              onClick={() => goto(toc)}
            >
              <div>{toc.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
