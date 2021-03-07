import React, { useCallback, useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import { isOdd, elementInViewport, throttle } from '@/utils';
import style from './index.module.scss';

interface IToc {
  level: number;
  text: string;
}

const HEIGHT = 32;

export const Toc: React.FC<{ tocs: Array<IToc>; maxHeight?: string | number }> = ({
  tocs = [],
}) => {
  const ref = useRef<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const goto = useCallback((toc) => {
    try {
      const el = document.getElementById(toc.text.toLowerCase().split(' ').join('-'));
      if (el) {
        el.scrollIntoView();
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const listener = throttle(() => {
      tocs.reduceRight((_, toc, index) => {
        const selector = toc.text.toLowerCase().split(' ').join('-');
        const el = document.getElementById(selector);
        if (!el) return;
        if (elementInViewport(el)) {
          setActive(index);
          ref.current.scrollTop = HEIGHT * index;
        }
        return _;
      }, null);
    }, 200);
    document.addEventListener('scroll', listener);

    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [tocs]);

  return (
    <div className={style.wrapper}>
      <header>目录</header>
      <main>
        <div ref={ref}>
          {tocs.map((toc, idx) => {
            const v = toc.level;
            const f = isOdd(v - 1);
            return (
              <div
                className={cls(style.item, idx === active && style.active)}
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
          <div className={style.indicator} style={{ top: HEIGHT * active + 'px' }} />
        </div>
      </main>
    </div>
  );
};
