import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAsyncLoading } from '@/hooks/useAsyncLoading';
import { SearchProvider } from '@/providers/search';
import { Spring } from '@/components/Animation/Spring';
import { ListTrail } from '@/components/Animation/Trail';
import styles from './index.module.scss';

const { Search: AntdSearch } = Input;

interface IProps {
  visible: boolean;
  tags: ITag[];
  onClose: (arg: boolean) => void;
}

export const Search: React.FC<IProps> = ({ visible = true, onClose }) => {
  const ref = useRef(null);
  const t = useTranslations();
  const [searchArticles, loading] = useAsyncLoading(SearchProvider.searchArticles);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const close = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.width = '';
    setArticles([]);
    onClose(false);
  }, [onClose]);

  const getArticles = useCallback(
    (keyword) => {
      if (!keyword) {
        setArticles([]);
        return;
      }
      searchArticles(keyword).then((res) => {
        const ret = res.filter((r) => r.status === 'publish' && !r.needPassword);
        setArticles(ret);
      });
    },
    [searchArticles]
  );

  useEffect(() => {
    const listener = (e) => {
      if (e.which === 27 || e.keyCode === 27) {
        close();
      }
    };
    document.body.addEventListener('keydown', listener);

    return () => {
      document.body.removeEventListener('keydown', listener);
    };
  }, [close]);

  useEffect(() => {
    if (!visible || !ref.current) {
      return;
    }
    ref.current.focus();
    document.body.style.overflow = 'hidden';
    document.body.style.width = 'calc(100% - 6px)';
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Spring from={{ y: 20 }} to={{ y: 0 }}>
        <div className="container">
          <header>
            <span className={styles.title}>{t('searchArticle')}</span>
            <span className={styles.btnWrapper} onClick={close}>
              <CloseOutlined />
              <span>esc</span>
            </span>
          </header>

          <section>
            <AntdSearch
              ref={ref}
              size="large"
              loading={loading}
              placeholder={t('searchArticlePlaceholder') as string}
              onSearch={getArticles}
              style={{ width: '100%' }}
            />
          </section>

          <section>
            <ul>
              <ListTrail
                length={articles.length}
                options={{
                  config: { mass: 1, tension: 180, friction: 12, clamp: true },
                  opacity: loading ? 0 : 1,
                  height: loading ? 0 : 48,
                  from: { opacity: 0, height: 0 },
                }}
                renderItem={(index) => {
                  const article = articles[index];
                  return (
                    <Link
                      key={article.id}
                      href={`/article/[id]`}
                      as={`/article/${article.id}`}
                      scroll={false}
                    >
                      <a className={styles.item} onClick={close}>
                        {article.title}
                      </a>
                    </Link>
                  );
                }}
              />
            </ul>
          </section>
        </div>
      </Spring>
    </div>
  );
};
