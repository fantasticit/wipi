import React, { useCallback } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Breadcrumb, Button, Row, Col, Icon } from 'antd';
import cls from 'classnames';
import { KnowledgeProvider } from '@/providers/knowledge';
import { LocaleTime } from '@/components/LocaleTime';
import { KnowledgeList } from '@/components/KnowledgeList';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  pId: string;
  book: IKnowledge;
  otherBooks: Array<IKnowledge>;
}

const Page: NextPage<IProps> = ({ pId, book, otherBooks = [] }) => {
  const chapters = (book && book.children) || [];

  const start = useCallback(() => {
    const chapter = chapters[0];
    window.open(`/knowledge/${pId}/${chapter.id}`);
  }, []);

  if (!book) {
    return null;
  }

  return (
    <div className={cls(style.wrapper)}>
      {book.cover && (
        <div
          className={style.bg}
          style={{
            backgroundImage: `url(${book.cover})`,
          }}
        ></div>
      )}
      <div className={cls('container')}>
        <div className={style.breadcrump}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/knowledge">
                <a>知识笔记</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{book.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <section className={style.desc}>
          {book.cover && (
            <div className={style.coverWrapper}>
              <img src={book.cover} alt="cover" />
            </div>
          )}
          <div className={style.infoWrapper}>
            <p className={style.title}>{book.title}</p>
            <p className={style.desc}>{book.summary}</p>
            <div className={style.meta}>
              <Button onClick={start} disabled={!chapters.length}>
                开始阅读
              </Button>
              <div>
                <span>{book.views} 次阅读</span>
                <span className={style.seperator}>·</span>
                <span className={style.pullRight}>
                  <LocaleTime date={book.publishAt} />
                </span>
              </div>
            </div>
          </div>
        </section>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={16}>
            <section className={cls(style.tocWrapper)}>
              <header>目录</header>
              <main className={style.bgMain}>
                {chapters.length ? (
                  <ul>
                    {chapters.map((chapter) => {
                      return (
                        <li key={chapter.id}>
                          <Link
                            as={`/knowledge/${pId}/${chapter.id}`}
                            href={`/knowledge/[pId]/[id]`}
                          >
                            <a>
                              <span>{chapter.title}</span>
                              <span>
                                <LocaleTime date={chapter.createAt} />
                                <Icon type="arrow-right" />
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className={'empty'}>敬请期待</div>
                )}
              </main>
            </section>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <section className={style.tocWrapper}>
              <header>其他知识笔记</header>
              <main>
                <KnowledgeList knowledges={otherBooks} />
              </main>
            </section>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Page.getInitialProps = async (ctx) => {
  const pId = ctx.query.pId as string;
  const [book, [allBooks]] = await Promise.all([
    KnowledgeProvider.getKnowledge(pId),
    KnowledgeProvider.getKnowledges({
      page: 1,
      pageSize: 6,
      status: 'publish',
    }),
  ]);
  return { pId, book, otherBooks: allBooks.filter((b) => b.id !== book.id) };
};

export default Page;
