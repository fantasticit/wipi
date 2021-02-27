import React, { useContext } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import cls from 'classnames';
import { Row, Col, Icon } from 'antd';
import * as dayjs from 'dayjs';
import { ArticleProvider } from '@/providers/article';
import { GlobalContext } from '@/context/global';
import { RecommendArticles } from '@components/RecommendArticles';
import { Tags } from '@components/Tags';
import { Categories } from '@components/Categories';
import style from './index.module.scss';

interface IProps {
  articles: { [key: string]: { [key: string]: IArticle[] } };
}

const ArchiveItem = ({ month, articles = [] }) => {
  return (
    <div className={style.item}>
      <h3>{month}</h3>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
              <a>
                <span className={style.meta}>
                  {dayjs.default(article.publishAt).format('MM-DD')}
                </span>
                <span className={style.title}>{article.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const resolveArticlesCount = (articles) => {
  const years = Object.keys(articles);
  return years.reduce((a, year) => {
    const months = Object.keys(articles[year]);
    a += months.reduce((b, month) => (b += articles[year][month].length), 0);
    return a;
  }, 0);
};

const Archives: NextPage<IProps> = ({ articles }) => {
  const { tags, categories } = useContext(GlobalContext);

  return (
    <div className={style.wrapper}>
      <div className={cls('container', style.container)}>
        <Row>
          <Col sm={16} className={style.main}>
            <div className={style.content}>
              <div className={style.summary}>
                <div>
                  <Icon type="block" />
                </div>
                <p>
                  <span>归档</span>
                </p>
                <p>
                  共计 <span>{resolveArticlesCount(articles)}</span> 篇
                </p>
              </div>
              {Object.keys(articles)
                .sort((a, b) => +b - +a)
                .map((year) => {
                  return (
                    <div className={style.list}>
                      <h2>{year}</h2>
                      {Object.keys(articles[year]).map((month) => {
                        return (
                          <ArchiveItem key={year} month={month} articles={articles[year][month]} />
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </Col>
          <Col sm={8} className={style.aside}>
            <RecommendArticles mode="inline" />
            <Categories categories={categories} />
            <Tags tags={tags} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

// 服务端预取数据
Archives.getInitialProps = async () => {
  const articles = await ArticleProvider.getArchives();
  return { articles };
};

export default Archives;
