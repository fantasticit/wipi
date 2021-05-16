import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import { ArticleProvider } from '@/providers/article';
import { ArticleList } from '@components/ArticleList';
import { LocaleTime } from '@/components/LocaleTime';
import style from './index.module.scss';

interface IProps {
  articleId?: string;
  mode?: 'inline' | 'vertical';
  needTitle?: boolean;
}

export const ArticleRecommend: React.FC<IProps> = ({
  mode = 'vertical',
  articleId = null,
  needTitle = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setLoading(true);
    ArticleProvider.getRecommend(articleId)
      .then((res) => {
        setArticles(res.slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [articleId]);

  return (
    <div className={style.wrapper}>
      {needTitle && (
        <div className={style.title}>
          <span>推荐文章</span>
        </div>
      )}
      <Spin spinning={loading}>
        {mode === 'inline' ? (
          articles.length <= 0 ? (
            <div className={'empty'}>{!loading && '暂无推荐'}</div>
          ) : (
            <ul className={style.inlineWrapper}>
              {(articles || []).map((article) => {
                return (
                  <li key={article.id} className={style.inlineItem}>
                    <div>
                      <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                        <a>
                          <p className={style.articleTitle}>
                            <span>{article.title}</span>
                            {' · '}
                            <span>
                              <LocaleTime date={article.publishAt} timeago={true} />
                            </span>
                          </p>
                        </a>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        ) : (
          <ArticleList articles={articles || []} coverHeight={110} />
        )}
      </Spin>
    </div>
  );
};
