import React, { useContext } from 'react';
import { BackTop } from 'antd';
import { GlobalContext } from '@/context/global';
import { Seo } from '@/components/Seo';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import style from './index.module.scss';

const defaultMenus = [
  {
    label: '首页',
    path: '/',
    dynamicPath: '/[tag]',
  },

  {
    label: '归档',
    path: '/archives',
  },
  {
    label: '知识笔记',
    path: '/knowledge',
  },
];

interface Iprops {
  backgroundColor?: string;
  needFooter?: boolean;
}

export const AppLayout: React.FC<Iprops> = ({ children, needFooter = true }) => {
  const { setting, pages } = useContext(GlobalContext);
  const menus = [
    ...defaultMenus,
    ...pages.map((r) => ({
      path: `/page/` + r.path,
      label: r.name,
    })),
  ];

  return (
    <div className={style.wrapper}>
      <Seo />
      <Header setting={setting} menus={menus} />
      <main className={style.main}>{children}</main>
      <BackTop />
      {needFooter && <Footer setting={setting} />}
    </div>
  );
};
