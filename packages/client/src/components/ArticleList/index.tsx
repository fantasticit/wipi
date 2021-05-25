import React from 'react';
import Link from 'next/link';
import { Row, Col, Card, Tooltip } from 'antd';
import LazyLoad from 'react-lazyload';
import { Opacity } from '@/components/Animation/Opacity';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

const { Meta } = Card;

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
    <Row gutter={16}>
      {articles && articles.length ? (
        articles.map((article) => {
          return (
            <Col className={style.articleItem} span={8} xs={24} sm={12} md={8}>
              <Opacity from={{ y: 20 }} to={{ y: 0 }}>
                <Link
                  key={article.id}
                  href={`/article/[id]`}
                  as={`/article/${article.id}`}
                  scroll={false}
                >
                  <Card
                    hoverable={true}
                    bordered={false}
                    cover={
                      <LazyLoad height={208}>
                        <div className={style.coverWrapper} style={{ height: coverHeight }}>
                          <img
                            src={article.cover}
                            alt="cover"
                            onClick={(e) => asRecommend && e.stopPropagation()}
                          />
                        </div>
                      </LazyLoad>
                    }
                  >
                    <Meta
                      title={
                        <Tooltip title={article.summary}>
                          <span className={style.title}>{article.title}</span>
                        </Tooltip>
                      }
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
              </Opacity>
            </Col>
          );
        })
      ) : (
        <div className={'empty'}>暂无数据</div>
      )}
    </Row>
  );
};
