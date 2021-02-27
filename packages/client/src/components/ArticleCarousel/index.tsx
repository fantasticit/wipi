import React from 'react';
import { Carousel } from 'antd';
import { format } from 'timeago.js';
import Link from 'next/link';
import style from './index.module.scss';

interface IProps {
  articles?: IArticle[];
}

export const ArticleCarousel: React.FC<IProps> = ({ articles = [] }) => {
  return articles && articles.length ? (
    <div className={style.wrapper}>
      <Carousel autoplay={true}>
        {(articles || [])
          .filter((article) => article.cover)
          .slice(0, 6)
          .map((article) => {
            return (
              <div key={article.id}>
                <div
                  className={style.articleItem}
                  style={{ backgroundImage: `url(${article.cover})` }}
                >
                  <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                    <a>
                      <div className={style.info}>
                        <h2 className={style.title}>{article.title}</h2>
                        <p>
                          <span>{format(article.publishAt, 'zh_CN')}</span>
                          <span className={style.seperator}>·</span>
                          <span>{article.views} 次阅读</span>
                        </p>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  ) : null;
};
