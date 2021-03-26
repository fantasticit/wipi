import React, { useEffect, useMemo } from 'react';
import cls from 'classnames';
import { NextPage } from 'next';
import Link from 'next/link';
import { Icon, Breadcrumb } from 'antd';
import { KnowledgeProvider } from '@/providers/knowledge';
import { DoubleColumnLayout } from '@/layout/DoubleColumnLayout';
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

  const prev = useMemo(() => {
    if (idx <= 0) return null;
    return chapters[idx - 1];
  }, [idx]);

  const next = useMemo(() => {
    if (idx >= chapters.length - 1) return null;
    return chapters[idx + 1];
  }, [idx]);

  // 更新阅读量
  useEffect(() => {
    if (!chapter) return;
    KnowledgeProvider.updateKnowledgeViews(pId);
    KnowledgeProvider.updateKnowledgeViews(id);
  }, [pId, id, chapter]);

  useEffect(() => {
    if (!chapter) return;
    const el = document.querySelector(`#js-toc-item-wrapper-` + id);
    if (el) {
      el.scrollIntoView();
    }
  }, []);

  if (!chapter) {
    return <p>未知章节内容</p>;
  }

  return (
    <>
      <DoubleColumnLayout
        leftNode={
          <>
            <div className={cls(style.breadcrump)}>
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
                  <div className={style.copyrightInfo}>
                    发布时间：
                    <LocaleTime date={chapter.publishAt} /> | 版权信息：
                    <a
                      href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
                      target="_blank"
                    >
                      非商用-署名-自由转载
                    </a>
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
                  <div className={style.commentWrap}>
                    <p className={style.title}>评论</p>
                    <Comment hostId={chapter.id} />
                  </div>
                ) : null}
              </div>
            </ImageViewer>
          </>
        }
        rightNode={
          <div className={'sticky'} style={{ marginTop: 37 }}>
            <div className={cls(style.infoWrapper, style.isBg)}>
              <header>{book.title}</header>
              <main>
                <ul>
                  {chapters.map((item) => {
                    return (
                      <li key={item.id} id={`js-toc-item-wrapper-` + item.id}>
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
              <div className={style.infoWrapper}>
                <Toc tocs={tocs} />
              </div>
            ) : null}
          </div>
        }
        showStar
        showComment={book.isCommentable}
        shareProps={{
          cover: book.cover,
          title: book.title,
          desc: chapter.title,
          url: `/knowledge/${pId}/${id}`,
        }}
      />
    </>
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
