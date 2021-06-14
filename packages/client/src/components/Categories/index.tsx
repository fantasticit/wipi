import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { ListTrail } from '@/components/Animation/Trail';
import style from './index.module.scss';

export const Categories = ({ categories = [] }) => {
  const router = useRouter();
  const t = useTranslations();
  const { category: routerCategory } = router.query;

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <span>{t('categoryTitle')}</span>
      </div>
      <ul>
        <ListTrail
          length={categories.length}
          options={{
            opacity: 1,
            height: 37,
            x: 0,
            from: { opacity: 0, height: 0, x: -20 },
          }}
          setItemContainerProps={(index) => ({
            className: cls(
              style.tagItem,
              routerCategory === categories[index].value ? style.active : false
            ),
          })}
          renderItem={(index) => {
            const category = categories[index];
            return (
              <Link href="/category/[category]" as={`/category/` + category.value} shallow={false}>
                <a>
                  <span>{category.label}</span>
                  <span>
                    {t('total')} {category.articleCount} {t('articleCountTemplate')}
                  </span>
                </a>
              </Link>
            );
          }}
        />
      </ul>
    </div>
  );
};
