import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import cls from 'classnames';
import { useTranslations } from 'next-intl';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { ArticleProvider } from '@/providers/article';
import { ListTrail } from '@/components/Animation/Trail';
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
  const [getRecommend, loading] = useAsyncLoading(ArticleProvider.getRecommend);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getRecommend(articleId).then((res) => {
      setArticles(res.slice(0, 6));
    });
  }, [articleId, getRecommend]);

  return (
    <div className={cls(style.wrapper, mode === 'inline' && style.inline)}>
      {needTitle && (
        <div className={style.title}>
          <span>{t('recommendToReading')}</span>
        </div>
      )}
      <Spin spinning={loading}>
        {mode === 'inline' ? (
          articles.length <= 0 ? (
            loading ? (
              <div style={{ height: 32 }}></div>
            ) : (
              <div className={'empty'}>{t('empty')}</div>
            )
          ) : (
            <ul className={style.inlineWrapper}>
              <ListTrail
                length={articles.length}
                options={{
                  opacity: loading ? 0 : 1,
                  height: loading ? 0 : 32,
                  x: 0,
                  from: { opacity: 0, height: 0, x: -20 },
                }}
                renderItem={(index) => {
                  const article = articles[index];
                  return (
                    <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
                      <a>
                        <span>{article.title}</span>
                        {' · '}
                        <span>
                          <LocaleTime date={article.publishAt} timeago={true} />
                        </span>
                      </a>
                    </Link>
                  );
                }}
              />
            </ul>
          )
        ) : (
          <ArticleList articles={articles || []} coverHeight={110} asRecommend={true} />
        )}
      </Spin>
    </div>
  );
};
