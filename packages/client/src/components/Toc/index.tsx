import React, { useCallback, useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import { useTranslations } from 'next-intl';
import { isOdd, elementInViewport } from '@/utils';
import { ListTrail } from '@/components/Animation/Trail';
import style from './index.module.scss';

interface IToc {
  level: number;
  id: string;
  text: string;
}

const HEIGHT = 32;

export const Toc: React.FC<{ tocs: Array<IToc>; maxHeight?: string | number }> = ({
  tocs = [],
}) => {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const goto = useCallback((toc) => {
    try {
      const el = document.getElementById(toc.id);
      if (el) {
        el.scrollIntoView();
      }
    } catch (e) {} // eslint-disable-line no-empty
  }, []);

  useEffect(() => {
    const listener = () => {
      tocs.reduceRight((_, toc, index) => {
        const el = document.getElementById(toc.id);
        if (!el) {
          return _;
        }
        if (elementInViewport(el)) {
          setActive(index);
          ref.current.scrollTop = HEIGHT * index;
        }
        return _;
      }, null);
    };
    document.addEventListener('scroll', listener);

    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, [tocs]);

  return (
    <div className={style.wrapper}>
      <header>{t('toc')}</header>
      <main>
        <div ref={ref}>
          <div>
            <ListTrail
              length={tocs.length}
              options={{
                opacity: 1,
                height: 32,
                from: { opacity: 0, height: 0 },
              }}
              element={'div'}
              renderItem={(idx) => {
                const toc = tocs[idx];
                const v = toc.level;
                const f = isOdd(v - 1);
                return (
                  <div
                    className={cls(style.item, idx === active && style.active)}
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
              }}
            />
            <div className={style.indicator} style={{ top: HEIGHT * active + 'px' }} />
          </div>
        </div>
      </main>
    </div>
  );
};
