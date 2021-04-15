import React from 'react';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

export const CommentArticle = ({ comment }) => {
  const setting = useSetting();
  const { url: link } = comment;

  return (
    <a
      href={url.resolve(setting.systemUrl || '', link)}
      className={style.link}
      target="_blank"
      rel="noreferrer"
    >
      文章
    </a>
  );
};
