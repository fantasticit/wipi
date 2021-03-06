import React, { useState, useCallback, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroller';
import { GlobalContext } from '@/context/global';
import { DoubleColumnLayout } from '@/layout/DoubleColumnLayout';
import { ArticleProvider } from '@/providers/article';
import { ArticleList } from '@components/ArticleList';
import { ArticleCarousel } from '@components/ArticleCarousel';
import { ArticleRecommend } from '@/components/ArticleRecommend';
import { Tags } from '@components/Tags';
import { Categories } from '@components/Categories';
import { Footer } from '@components/Footer';
import style from './index.module.scss';

interface IHomeProps {
  articles: IArticle[];
  total: number;
  recommendedArticles: IArticle[];
}

const pageSize = 12;

const Home: NextPage<IHomeProps> = ({
  articles: defaultArticles = [],
  recommendedArticles = [],
  total = 0,
}) => {
  const { setting, tags, categories } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);

  useEffect(() => {
    setArticles(defaultArticles);
  }, [defaultArticles]);

  const getArticles = useCallback((page) => {
    ArticleProvider.getArticles({
      page,
      pageSize,
      status: 'publish',
    }).then((res) => {
      setPage(page);
      setArticles((articles) => [...articles, ...res[0]]);
    });
  }, []);

  return (
    <>
      <ArticleCarousel articles={recommendedArticles} />
      <DoubleColumnLayout
        leftNode={
          <InfiniteScroll
            pageStart={1}
            loadMore={getArticles}
            hasMore={page * pageSize < total}
            loader={
              <div className={'loading'} key={0}>
                正在获取文章...
              </div>
            }
          >
            <ArticleList articles={articles} />
          </InfiniteScroll>
        }
        rightNode={
          <>
            <ArticleRecommend mode="inline" />
            <div className={'sticky'}>
              <Categories categories={categories} />
              <Tags tags={tags} />
              <Footer className={style.footer} setting={setting} />
            </div>
          </>
        }
      />
    </>
  );
};

// 服务端预取数据
Home.getInitialProps = async () => {
  const [articles, recommendedArticles] = await Promise.all([
    ArticleProvider.getArticles({ page: 1, pageSize, status: 'publish' }),
    ArticleProvider.getAllRecommendArticles().catch(() => []),
  ]);
  return {
    articles: articles[0],
    total: articles[1],
    recommendedArticles,
    needLayoutFooter: false,
  };
};

export default Home;
