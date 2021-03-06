import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from 'antd';
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
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    ArticleProvider.getRecommend(articleId).then((res) => {
      setArticles(res.slice(0, 6));
    });
  }, [articleId]);

  return (
    <div className={style.wrapper}>
      {needTitle && (
        <div className={style.title}>
          <Icon type="file-text" />
          <span>推荐文章</span>
        </div>
      )}
      {mode === 'inline' ? (
        articles.length <= 0 ? (
          <p className={style.empty}>暂无推荐</p>
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
                            <LocaleTime date={article.publishAt} timeago />
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
        <ArticleList articles={articles || []} />
      )}
    </div>
  );
};
