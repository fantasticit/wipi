import React from 'react';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

export const CommentArticle = ({ comment }) => {
  const setting = useSetting();
  const { hostId, isHostInPage } = comment;

  return (
    <>
      {hostId ? (
        <a
          href={url.resolve(
            setting.systemUrl || '',
            `/${isHostInPage ? 'page' : 'article'}/` + hostId
          )}
          className={style.link}
          target="_blank"
        >
          文章
        </a>
      ) : (
        '文章不存在，可能已经被删除'
      )}
    </>
  );
};
