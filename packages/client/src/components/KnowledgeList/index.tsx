import React from 'react';
import Link from 'next/link';
import { Row } from 'antd';
import LazyLoad from 'react-lazyload';
import { Opacity } from '@/components/Animation/Opacity';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

interface IProps {
  knowledges: IKnowledge[];
}

export const KnowledgeList: React.FC<IProps> = ({ knowledges = [] }) => {
  return (
    <>
      {knowledges && knowledges.length ? (
        knowledges.map((knowledge) => {
          return (
            <div className={style.articleItem}>
              <Link
                key={knowledge.id}
                href={`/knowledge/[pId]`}
                as={`/knowledge/${knowledge.id}`}
                scroll={false}
              >
                <a>
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
                        <LocaleTime date={knowledge.publishAt} timeago={true} />
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })
      ) : (
        <div className={'empty'}>暂无数据</div>
      )}
    </>
  );
};
