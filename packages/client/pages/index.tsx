import React, { useState, useCallback, useEffect, useContext } from 'react';
import cls from 'classnames';
import { NextPage } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import { GlobalContext } from '@/context/global';
import { DoubleColumnLayout } from '@/layout/DoubleColumnLayout';
import { ArticleProvider } from '@/providers/article';
import { ArticleList } from '@components/ArticleList';
import { ArticleCarousel } from '@components/ArticleCarousel';
import { ArticleRecommend } from '@/components/ArticleRecommend';
import { Tags } from '@components/Tags';
import { Footer } from '@components/Footer';
import style from './index.module.scss';

interface IHomeProps {
  articles: IArticle[];
  total: number;
  recommendedArticles: IArticle[];
}

const pageSize = 12;

export const CategoryMenu = ({ categories }) => {
  const t = useTranslations();
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      {[
        {
          label: t('all'),
          path: '/',
        },
        ...categories,
      ].map((category, index) => (
        <Link
          key={index}
          {...(index === 0
            ? { href: '/' }
            : {
                href: '/category/[category]',
                as: `/category/` + category.value,
              })}
          shallow={false}
        >
          <a
            className={cls({
              [style.active]:
                index === 0
                  ? asPath === category.path
                  : asPath.replace('/category/', '') === category.value,
            })}
          >
            <span>{category.label}</span>
          </a>
        </Link>
      ))}
    </>
  );
};

const Home: NextPage<IHomeProps> = ({
  articles: defaultArticles = [],
  recommendedArticles = [],
  total = 0,
}) => {
  const t = useTranslations();
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
    <div className={style.wrapper}>
      <DoubleColumnLayout
        leftNode={
          <>
            <div className={style.crouselWrap}>
              <ArticleCarousel articles={recommendedArticles} />
            </div>
            <div className={style.leftWrap}>
              <header>
                <CategoryMenu categories={categories} />
              </header>
              <main>
                <InfiniteScroll
                  pageStart={1}
                  loadMore={getArticles}
                  hasMore={page * pageSize < total}
                  loader={
                    <div className={'loading'} key={0}>
                      {t('gettingArticle')}
                    </div>
                  }
                >
                  <ArticleList articles={articles} />
                </InfiniteScroll>
              </main>
            </div>
          </>
        }
        rightNode={
          <div className="sticky">
            <ArticleRecommend mode="inline" />
            <Tags tags={tags} />
          </div>
        }
      />
      <Footer setting={setting} />
    </div>
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
