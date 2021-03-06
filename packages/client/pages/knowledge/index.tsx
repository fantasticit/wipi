import React, { useState, useCallback, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import cls from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import { GlobalContext } from '@/context/global';
import { KnowledgeProvider } from '@/providers/knowledge';
import { KnowledgeList } from '@components/KnowledgeList';
import { Tags } from '@components/Tags';
import { Categories } from '@components/Categories';
import style from './index.module.scss';

interface IHomeProps {
  books: IKnowledge[];
  total: number;
}

const pageSize = 12;

const Page: NextPage<IHomeProps> = ({ books: defaultBooks = [], total = 0 }) => {
  const { setting, tags, categories } = useContext(GlobalContext);
  const [affix, setAffix] = useState(false);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<IKnowledge[]>(defaultBooks);

  useEffect(() => {
    const handler = () => {
      // @ts-ignore
      const y = window.scrollY;
      setAffix(y > 380);
    };
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

  useEffect(() => {
    setBooks(defaultBooks);
  }, [defaultBooks]);

  const getArticles = useCallback((page) => {
    KnowledgeProvider.getKnowledges({
      page,
      pageSize,
      status: 'publish',
    }).then((res) => {
      setPage(page);
      setBooks((articles) => [...articles, ...res[0]]);
    });
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={cls('container', style.container)}>
        <div className={style.content}>
          <InfiniteScroll
            pageStart={1}
            loadMore={getArticles}
            hasMore={page * pageSize < total}
            loader={
              <div className={style.loading} key={0}>
                正在获取知识...
              </div>
            }
          >
            <KnowledgeList knowledges={books} />
          </InfiniteScroll>
          <aside className={cls(style.aside)}>
            <div className={cls(affix ? style.isFixed : false)}>
              <Categories categories={categories} />
              <Tags tags={tags} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// 服务端预取数据
Page.getInitialProps = async () => {
  const [books, total] = await KnowledgeProvider.getKnowledges({
    page: 1,
    pageSize,
    status: 'publish',
  });
  return {
    books,
    total,
    needLayoutFooter: false,
  };
};

export default Page;
