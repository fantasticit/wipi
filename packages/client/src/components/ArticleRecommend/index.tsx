import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import cls from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import { useTranslations } from 'next-intl';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { useToggle } from '@/hooks/useToggle';
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
  const t = useTranslations();
  const [getRecommend, loading] = useAsyncLoading(ArticleProvider.getRecommend, 150, true);
  const [fetched, setFetched] = useState('');
  const [articles, setArticles] = useState([]);

  const onViewportChange = useCallback(
    (visible) => {
      if (fetched === articleId) return;
      if (visible) {
        getRecommend(articleId).then((res) => {
          setArticles(res.slice(0, 6));
          setFetched(articleId);
        });
      }
    },
    [articleId, getRecommend, fetched]
  );

  return (
    <div className={cls(style.wrapper, mode === 'inline' && style.inline)}>
      {needTitle && (
        <div className={style.title}>
          <span>{t('recommendToReading')}</span>
        </div>
      )}
      <VisibilitySensor onChange={onViewportChange}>
        <Spin spinning={loading}>
          {loading ? (
            <div style={{ height: 150, backgroundColor: 'var(--bg-second)' }}></div>
          ) : mode === 'inline' ? (
            articles.length <= 0 ? (
              loading ? (
                <div style={{ height: 32 }}></div>
              ) : (
                <div className={'empty'}>{t('empty')}</div>
              )
            ) : (
              <ul className={style.inlineWrapper}>
                {articles.map((article) => {
                  return (
                    <li>
                      <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                        <a>
                          <span>{article.title}</span>
                          {' · '}
                          <span>
                            <LocaleTime date={article.publishAt} timeago={true} />
                          </span>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )
          ) : (
            <ArticleList articles={articles || []} coverHeight={110} asRecommend={true} />
          )}
        </Spin>
      </VisibilitySensor>
    </div>
  );
};
