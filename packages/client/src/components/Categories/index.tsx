import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { Icon } from 'antd';
import { useRouter } from 'next/router';
import style from './index.module.scss';

export const Categories = ({ categories = [] }) => {
  const router = useRouter();
  const { category: routerCategory } = router.query;

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <Icon type="appstore" />
        <span>文章分类</span>
      </div>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={cls(style.tagItem, routerCategory === category.value ? style.active : false)}
          >
            <Link href="/[category]" as={`/` + category.value} shallow={false}>
              <a>
                <span>{category.label}</span>
                <span>共 {category.articleCount} 篇文章</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
