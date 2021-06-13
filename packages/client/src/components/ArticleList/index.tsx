import React from 'react';
import Link from 'next/link';
import { Divider } from 'antd';
import { HeartOutlined, EyeOutlined, ShareAltOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import { Opacity } from '@/components/Animation/Opacity';
import { LocaleTime } from '@/components/LocaleTime';
import { Share } from '@/components/Share';
import style from './index.module.scss';

interface IProps {
  articles: IArticle[];
  coverHeight?: number;
  asRecommend?: boolean;
}

export const ArticleList: React.FC<IProps> = ({
  articles = [],
  coverHeight = 168,
  asRecommend = false,
}) => {
  return (
    <div className={style.wrapper}>
      {articles && articles.length ? (
        articles.map((article) => {
          return (
            <div className={style.articleItem}>
              <Opacity>
                <Link
                  key={article.id}
                  href={`/article/[pId]`}
                  as={`/article/${article.id}`}
                  scroll={false}
                >
                  <a>
                    <header>
                      <div className={style.title}>{article.title}</div>
                      <div className={style.info}>
                        <Divider type="vertical" />
                        <span className={style.time}>
                          <LocaleTime date={article.publishAt} timeago={true} />
                        </span>
                        {article.category && (
                          <>
                            <Divider type="vertical" />
                            <span className={style.time}>{article.category.label}</span>
                          </>
                        )}
                      </div>
                    </header>
                    <main>
                      {article.cover && (
                        <LazyLoad height={120}>
                          <div className={style.coverWrapper}>
                            <img src={article.cover} alt="cover" />
                          </div>
                        </LazyLoad>
                      )}

                      <div>
                        <div className={style.desc}>{article.summary}</div>
                        <div className={style.meta}>
                          <span>
                            <HeartOutlined />
                            <span className={style.number}>{article.likes}</span>
                          </span>
                          <span className={style.seperator}>·</span>
                          <span>
                            <EyeOutlined />
                            <span className={style.number}>{article.views}</span>
                          </span>
                          <span className={style.seperator}>·</span>
                          <Share
                            cover={article.cover}
                            title={article.title}
                            desc={article.summary}
                            url={`/article/${article.id}`}
                          >
                            <span>
                              <ShareAltOutlined />
                              <span className={style.number}>分享</span>
                            </span>
                          </Share>
                        </div>
                      </div>
                    </main>
                  </a>
                </Link>
              </Opacity>
            </div>
          );
        })
      ) : (
        <div className={'empty'}>暂无数据</div>
      )}
    </div>
  );
};
