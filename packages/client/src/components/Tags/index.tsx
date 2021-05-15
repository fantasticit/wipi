import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { Tag } from 'antd';
import { useRouter } from 'next/router';
import style from './index.module.scss';

export const Tags = ({ tags = [], needTitle = true, style: cssStyle = {} }) => {
  const router = useRouter();
  const { tag: routerTag } = router.query;

  return (
    <div className={style.wrapper} style={cssStyle}>
      {needTitle && <div className={style.title}>文章标签</div>}
      <div>
        {tags
          .filter((tag) => tag.articleCount > 0)
          .map((tag) => (
            <Link key={tag.id} href={`/tag/[tag]`} as={`/tag/` + tag.value} scroll={false}>
              <a className={cls(style.tagItem, routerTag === tag.value ? style.active : false)}>
                {tag.label}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};
