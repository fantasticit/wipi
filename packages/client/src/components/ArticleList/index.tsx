import React from 'react';
import Link from 'next/link';
import { Row, Col, Card } from 'antd';
import LazyLoad from 'react-lazyload';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

const { Meta } = Card;

interface IProps {
  articles: IArticle[];
}

export const ArticleList: React.FC<IProps> = ({ articles = [] }) => {
  return (
    <Row gutter={16}>
      {articles && articles.length ? (
        articles
          .filter((article) => article.cover)
          .map((article) => {
            return (
              <Col className={style.articleItem} span={8} xs={24} sm={12} md={8}>
                <Link
                  key={article.id}
                  href={`/article/[id]`}
                  as={`/article/${article.id}`}
                  scroll={false}
                >
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <LazyLoad height={208}>
                        <div className={style.coverWrapper}>
                          <img src={article.cover} alt="cover" />
                        </div>
                      </LazyLoad>
                    }
                  >
                    <Meta
                      title={<p className={style.title}>{article.title}</p>}
                      description={
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
                      }
                    />
                  </Card>
                </Link>
              </Col>
            );
          })
      ) : (
        <div className={'empty'}>暂无数据</div>
      )}
    </Row>
  );
};
