import React from 'react';
import Link from 'next/link';
import cls from 'classnames';
import LazyLoad from 'react-lazyload';
import * as dayjs from 'dayjs';
import style from './index.module.scss';

interface IProps {
  articles: IArticle[];
  bordered?: boolean;
  asCard?: boolean;
  needMeta?: boolean;
}

export const ArticleList: React.FC<IProps> = ({
  articles = [],
  bordered = false,
  asCard = false,
  needMeta = true,
}) => {
  return (
    <div style={{ width: '100%' }} className={cls(style.wrapper, asCard ? style.asCard : false)}>
      {articles && articles.length ? (
        articles.map((article) => {
          return (
            <div
              key={article.id}
              className={cls(
                style.articleListItem,
                bordered ? style.isBordered : false,
                asCard ? style.asCard : false
              )}
            >
              <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                <a>
                  <div className={style.info}>
                    {article.cover && (
                      <LazyLoad height={110}>
                        <div className={style.imgWrapper}>
                          <img src={article.cover} alt="cover" />
                        </div>
                      </LazyLoad>
                    )}
                    <div className={style.textInfoWrapper}>
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
                        <span className={style.pullRight}>
                          {dayjs.default(article.publishAt).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })
      ) : (
        <div className={style.empty}>暂无数据</div>
      )}
    </div>
  );
};
