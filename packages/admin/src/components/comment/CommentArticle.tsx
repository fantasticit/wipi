import React from 'react';
import { resolveUrl } from '@/utils';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';

export const CommentArticle = ({ comment }) => {
  const setting = useSetting();
  const { url: link } = comment;

  return (
    <a
      href={resolveUrl(setting.systemUrl, link)}
      className={style.link}
      target="_blank"
      rel="noreferrer"
    >
      文章
    </a>
  );
};
