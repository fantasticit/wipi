import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Row, Col, Icon } from 'antd';
import { ArticleProvider } from '@/providers/article';
import { ArticleList } from '@components/ArticleList';
import { format } from 'timeago.js';
import style from './index.module.scss';

interface IProps {
  articleId?: string;
  mode?: 'inline' | 'vertical' | 'horizontal';
  needTitle?: boolean;
  asCard?: boolean;
}

export const RecommendArticles: React.FC<IProps> = ({
  mode = 'vertical',
  articleId = null,
  needTitle = true,
  asCard = false,
}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    ArticleProvider.getRecommend(articleId).then((res) => {
      setArticles(res);
    });
  }, [articleId]);

  return (
    <div className={style.wrapper}>
      {needTitle && (
        <div className={style.title}>
          <Icon type="file-text" />
          <span>推荐</span>
        </div>
      )}
      {articles.length <= 0 ? <p className={style.empty}>暂无推荐</p> : null}
      {mode === 'inline' ? (
        <ul className={style.inlineWrapper}>
          {(articles || []).map((article) => {
            return (
              <li key={article.id} className={style.inlineItem}>
                <div>
                  <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                    <a>
                      <p className={style.articleTitle}>
                        <span>{article.title}</span>
                        {' · '}
                        <span>{format(article.publishAt, 'zh_CN')}</span>
                      </p>
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : mode === 'horizontal' ? (
        <Row gutter={[16, 16]}>
          {(articles || [])
            .filter((article) => article.cover)
            .map((article) => {
              return (
                <Col span={12} xs={24} sm={12} key={article.id}>
                  <div className={style.articleItem}>
                    <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                      <a>
                        <div>
                          <img src={article.cover} alt="" />
                        </div>
                        <h1 className={style.title}>{article.title}</h1>
                        <div className={style.meta}>{format(article.publishAt, 'zh_CN')}</div>
                      </a>
                    </Link>
                  </div>
                </Col>
              );
            })}
        </Row>
      ) : (
        <ArticleList articles={articles || []} asCard={asCard} />
      )}
    </div>
  );
};
