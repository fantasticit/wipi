import React from 'react';
import Link from 'next/link';
import cls from 'classnames';
import { Row, Col, Card } from 'antd';
import LazyLoad from 'react-lazyload';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

const { Meta } = Card;

interface IProps {
  knowledges: IKnowledge[];
  horizontal?: boolean;
}

export const KnowledgeList: React.FC<IProps> = ({ knowledges = [], horizontal = false }) => {
  return (
    <Row gutter={16}>
      {knowledges && knowledges.length ? (
        knowledges.map((knowledge) => {
          return horizontal ? (
            <Link
              key={knowledge.id}
              href={`/knowledge/[pId]`}
              as={`/knowledge/${knowledge.id}`}
              scroll={false}
            >
              <a className={cls(style.articleItem)}>
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
          ) : (
            <Col
              className={style.item}
              {...{
                span: 8,
                xs: 24,
                sm: 12,
                md: 8,
              }}
            >
              <Link
                key={knowledge.id}
                href={`/knowledge/[id]`}
                as={`/knowledge/${knowledge.id}`}
                scroll={false}
              >
                <Card
                  hoverable={true}
                  bordered={false}
                  cover={
                    <LazyLoad height={208}>
                      <div className={style.coverWrapper}>
                        <img src={knowledge.cover} alt="cover" />
                      </div>
                    </LazyLoad>
                  }
                >
                  <Meta
                    title={<p className={style.title}>{knowledge.title}</p>}
                    description={
                      <div className={style.meta}>
                        <span>{knowledge.views} 次阅读</span>
                        <span className={style.seperator}>·</span>
                        <span className={style.pullRight}>
                          <LocaleTime date={knowledge.publishAt} timeago={true} />
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
