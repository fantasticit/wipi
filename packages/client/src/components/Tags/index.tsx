import React from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { Icon } from 'antd';
import { useRouter } from 'next/router';
import style from './index.module.scss';

export const Tags = ({ tags = [], needTitle = true, style: cssStyle = {} }) => {
  const router = useRouter();
  const { tag: routerTag } = router.query;

  return (
    <div className={style.wrapper} style={cssStyle}>
      {needTitle && (
        <div className={style.title}>
          <Icon type="tags" />
          <span>文章标签</span>
        </div>
      )}
      <ul>
        {tags.map((tag) => (
          <li
            key={tag.id}
            className={cls(style.item, routerTag === tag.value ? style.active : false)}
          >
            <Link href={`/tag/[tag]`} as={`/tag/` + tag.value} scroll={false}>
              <a>
                {tag.label} [{tag.articleCount}]
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
