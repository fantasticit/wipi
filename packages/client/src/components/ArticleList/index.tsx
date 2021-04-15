import React from 'react';
import Link from 'next/link';
import cls from 'classnames';
import LazyLoad from 'react-lazyload';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

interface IProps {
  articles: IArticle[];
}

export const ArticleList: React.FC<IProps> = ({ articles = [] }) => {
  return (
    <div style={{ width: '100%' }} className={cls(style.wrapper)}>
      {articles && articles.length ? (
        articles.map((article) => {
          return (
            <Link
              key={article.id}
              href={`/article/[id]`}
              as={`/article/${article.id}`}
              scroll={false}
            >
              <a className={cls(style.articleItem)}>
                {article.cover && (
                  <LazyLoad height={110}>
                    <div className={style.coverWrapper}>
                      <img src={article.cover} alt="cover" />
                    </div>
                  </LazyLoad>
                )}
                <div className={style.infoWrapper}>
                  <p className={style.title}>{article.title}</p>
                  <p className={style.desc}>{article.summary}</p>
                  <div className={style.meta}>
                    {article.category ? (
                      <>
                        <span className={style.category}>
                          {article.category ? article.category.label : ''}
                        </span>
                        <span className={style.seperator}>·</span>
                      </>
                    ) : null}
                    <span>{article.views} 次阅读</span>
                    <span className={style.seperator}>·</span>
                    <span className={style.pullRight}>
                      <LocaleTime date={article.publishAt} timeago={true} />
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
