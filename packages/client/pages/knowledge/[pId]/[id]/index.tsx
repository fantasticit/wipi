import React, { useState, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Icon, Breadcrumb } from 'antd';
import cls from 'classnames';
import { KnowledgeProvider } from '@/providers/knowledge';
import { LocaleTime } from '@/components/LocaleTime';
import { ImageViewer } from '@/components/ImageViewer';
import { MarkdownReader } from '@/components/MarkdownReader';
import { Toc } from '@/components/Toc';
import { Comment } from '@/components/Comment';
import style from './index.module.scss';

interface IProps {
  pId: string;
  id: string;
  book: IKnowledge;
  chapter: IKnowledge;
}

const Page: NextPage<IProps> = ({ pId, id, book, chapter }) => {
  const chapters = book.children || [];
  const tocs = chapter.toc ? JSON.parse(chapter.toc) : [];
  const idx = chapters.findIndex((t) => t.id === chapter.id);
  const [affix, setAffix] = useState(false);

  const prev = useMemo(() => {
    if (idx <= 0) return null;
    return chapters[idx - 1];
  }, [idx]);

  const next = useMemo(() => {
    if (idx >= chapters.length - 1) return null;
    return chapters[idx + 1];
  }, [idx]);

  useEffect(() => {
    const handler = () => {
      // @ts-ignore
      const y = window.scrollY;
      setAffix(y > 118);
    };
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

  // 更新阅读量
  useEffect(() => {
    if (!chapter) return;
    KnowledgeProvider.updateKnowledgeViews(pId);
    KnowledgeProvider.updateKnowledgeViews(id);
  }, [pId, id, chapter]);

  if (!chapter) {
    return <p>未知章节内容</p>;
  }

  return (
    <div className={cls(style.wrapper)}>
      <div className={cls('container')}>
        <div className={style.breadcrump}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/knowledge">
                <a>知识笔记</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link as={`/knowledge/${pId}`} href="/knowledge/[pId]">
                <a>{book.title}</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{chapter.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.main}>
          <ImageViewer containerSelector="#js-knowledge-content">
            <div id="js-knowledge-content" className={style.content}>
              <article>
                <div className={style.meta}>
                  <h1 className={style.title}>{chapter.title}</h1>
                  <p className={style.desc}>
                    <span>
                      发布于
                      <LocaleTime date={chapter.publishAt} />
                    </span>
                    <span> • </span>
                    <span>阅读量 {chapter.views}</span>
                  </p>
                </div>
                <div>
                  <MarkdownReader content={chapter.html || chapter.content} />
                </div>
                <div className={style.metaInfo}>
                  <p>
                    发布时间：
                    <LocaleTime date={chapter.publishAt} /> | 版权信息：
                    <a
                      href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
                      target="_blank"
                    >
                      非商用-署名-自由转载
                    </a>
                  </p>
                </div>
                <div className={style.navigation}>
                  {prev && (
                    <div
                      className={style.left}
                      style={{
                        width: next ? '45%' : '100%',
                      }}
                    >
                      <Link href={`/knowledge/[pId]/[id]`} as={`/knowledge/${pId}/${prev.id}`}>
                        <a>
                          <Icon type="arrow-left" />
                          <span>{prev.title}</span>
                        </a>
                      </Link>
                    </div>
                  )}
                  {next && (
                    <div
                      className={style.right}
                      style={{
                        width: prev ? '45%' : '100%',
                      }}
                    >
                      <Link href={`/knowledge/[pId]/[id]`} as={`/knowledge/${pId}/${next.id}`}>
                        <a>
                          <span>{next.title}</span>
                          <Icon type="arrow-right" />
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
              {book.isCommentable ? (
                <>
                  <p className={style.title}>评论</p>
                  <Comment hostId={chapter.id} />
                </>
              ) : null}
            </div>
          </ImageViewer>
          <aside className={style.aside}>
            <div className={cls(affix ? style.isFixed : false)}>
              <div className={cls(style.infoWrapper, style.isBg)}>
                <header>{book.title}</header>
                <main>
                  <ul>
                    {chapters.map((item) => {
                      return (
                        <li key={item.id}>
                          <Link as={`/knowledge/${pId}/${item.id}`} href={`/knowledge/[pId]/[id]`}>
                            <a className={cls(item.id === id && style.active)}>{item.title}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </main>
              </div>
              {tocs && tocs.length ? (
                <div className={style.infoWrapper} style={{ marginTop: '1rem' }}>
                  <header>目录</header>
                  <main>
                    <Toc tocs={tocs} />
                  </main>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

Page.getInitialProps = async (ctx) => {
  const { pId, id } = ctx.query;
  const [book, chapter] = await Promise.all([
    KnowledgeProvider.getKnowledge(pId),
    KnowledgeProvider.getKnowledge(id),
  ]);
  return { pId, book, id, chapter } as {
    pId: string;
    book: IKnowledge;
    id: string;
    chapter: IKnowledge;
  };
};

export default Page;
