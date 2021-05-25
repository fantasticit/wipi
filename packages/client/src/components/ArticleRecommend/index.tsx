import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
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
  const [getRecommend, loading] = useAsyncLoading(ArticleProvider.getRecommend);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getRecommend(articleId).then((res) => {
      setArticles(res.slice(0, 6));
    });
  }, [articleId, getRecommend]);

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
            loading ? (
              <div style={{ height: 32 }}></div>
            ) : (
              <div className={'empty'}>暂无推荐</div>
            )
          ) : (
            <ul className={style.inlineWrapper}>
              <ListTrail
                length={articles.length}
                options={{
                  opacity: loading ? 0 : 1,
                  height: loading ? 0 : 32,
                  from: { opacity: 0, height: 0 },
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
          <ArticleList articles={articles || []} coverHeight={110} asRecommend />
        )}
      </Spin>
    </div>
  );
};
