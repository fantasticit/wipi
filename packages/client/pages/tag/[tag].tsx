import React, { useState, useCallback, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import cls from 'classnames';
import { Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { throttle } from '@/utils';
import { ArticleProvider } from '@/providers/article';
import { TagProvider } from '@/providers/tag';
import { GlobalContext } from '@/context/global';
import { ArticleList } from '@components/ArticleList';
import { RecommendArticles } from '@components/RecommendArticles';
import { Tags } from '@components/Tags';
import { Categories } from '@components/Categories';
import { Footer } from '@components/Footer';
import style from '../index.module.scss';

interface IProps {
  articles: IArticle[];
  total: number;
  tag: ITag;
}

const pageSize = 12;

const Home: NextPage<IProps> = ({ articles: defaultArticles = [], total, tag }) => {
  const { setting, tags, categories } = useContext(GlobalContext);
  const [affix, setAffix] = useState(false);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);

  useEffect(() => {
    const handler = throttle(() => {
      // @ts-ignore
      const y = window.scrollY;
      setAffix(y > 100);
    }, 200);
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

  useEffect(() => {
    setArticles(defaultArticles);
  }, [defaultArticles]);

  const getArticles = useCallback((page) => {
    ArticleProvider.getArticlesByTag(tag.value, {
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
      <div className={cls('container', style.container)}>
        <div className={style.content}>
          <div className={style.tagOrCategoryDetail}>
            <div>
              <Icon type="tags" />
            </div>
            <p>
              与 <span>{tag.label}</span> 标签有关的文章
            </p>
            <p>
              共搜索到 <span>{total}</span> 篇
            </p>
          </div>
          <InfiniteScroll
            pageStart={1}
            loadMore={getArticles}
            hasMore={page * pageSize < total}
            loader={
              <div className={style.loading} key={0}>
                正在获取文章...
              </div>
            }
          >
            <ArticleList articles={articles} />
          </InfiniteScroll>
          <aside className={cls(style.aside)}>
            <div>
              <div
                style={{
                  transform: `translateY(${affix ? '-100%' : 0})`,
                }}
              >
                <RecommendArticles mode="inline" />
              </div>
              <div className={cls(affix ? style.isFixed : false)}>
                <Categories categories={categories} />
                <Tags tags={tags} />
                <Footer className={style.footer} setting={setting} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// 服务端预取数据
Home.getInitialProps = async (ctx) => {
  const { tag: tagValue } = ctx.query;
  const [articles, tag] = await Promise.all([
    ArticleProvider.getArticlesByTag(tagValue, {
      page: 1,
      pageSize: 8,
      status: 'publish',
    }),
    TagProvider.getTagById(tagValue),
  ]);
  return {
    articles: articles[0],
    total: articles[1],
    tag: tag,
    needLayoutFooter: false,
  };
};

export default Home;
