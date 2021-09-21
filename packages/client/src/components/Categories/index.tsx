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
        {categories.map(category => {
          return (
            <li>
              <Link href="/category/[category]" as={`/category/` + category.value} shallow={false}>
                <a>
                  <span>{category.label}</span>
                  <span>
                    {t('total')} {category.articleCount} {t('articleCountTemplate')}
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
