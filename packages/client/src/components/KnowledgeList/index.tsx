import React from 'react';
import Link from 'next/link';
import cls from 'classnames';
import LazyLoad from 'react-lazyload';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

interface IProps {
  knowledges: IKnowledge[];
  isBoxshadowed?: boolean;
}

export const KnowledgeList: React.FC<IProps> = ({ knowledges = [], isBoxshadowed = true }) => {
  return (
    <div style={{ width: '100%' }} className={cls(style.wrapper)}>
      {knowledges && knowledges.length ? (
        knowledges.map((knowledge) => {
          return (
            <Link
              key={knowledge.id}
              href={`/knowledge/[pId]`}
              as={`/knowledge/${knowledge.id}`}
              scroll={false}
            >
              <a className={cls(style.articleItem, isBoxshadowed && style.isBoxshadowed)}>
                {knowledge.cover && (
                  <LazyLoad height={110}>
                    <div className={style.coverWrapper}>
                      <img src={knowledge.cover} alt="cover" />
                    </div>
                  </LazyLoad>
                )}
                <div className={style.infoWrapper}>
                  <p className={style.title}>{knowledge.title}</p>
                  <p className={style.desc}>{knowledge.summary}</p>
                  <div className={style.meta}>
                    <span>{knowledge.views} 次阅读</span>
                    <span className={style.seperator}>·</span>
                    <span className={style.pullRight}>
                      <LocaleTime date={knowledge.publishAt} />
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          );
        })
      ) : (
        <div className={'empty'}>暂无数据</div>
      )}
    </div>
  );
};
