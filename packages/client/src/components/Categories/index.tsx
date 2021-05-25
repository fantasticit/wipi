import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ListTrail } from '@/components/Animation/Trail';
import { Spring } from '@/components/Animation/Spring';
import style from './index.module.scss';

export const Categories = ({ categories = [] }) => {
  const router = useRouter();
  const { category: routerCategory } = router.query;

  return (
    <Spring from={{ y: 20 }} to={{ y: 0 }}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <span>文章分类</span>
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
                <Link href="/[category]" as={`/` + category.value} shallow={false}>
                  <a>
                    <span>{category.label}</span>
                    <span>共 {category.articleCount} 篇文章</span>
                  </a>
                </Link>
              );
            }}
          />
        </ul>
      </div>
    </Spring>
  );
};
