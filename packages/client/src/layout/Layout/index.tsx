import React, { useContext } from 'react';
import { BackTop } from 'antd';
import { GlobalContext } from '@/context/global';
import { Seo } from '@/components/Seo';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
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
];

interface Iprops {
  backgroundColor?: string;
  needFooter?: boolean;
}

export const Layout: React.FC<Iprops> = ({ children, needFooter = true }) => {
  const { setting, pages } = useContext(GlobalContext);
  const menus = [
    ...defaultMenus,
    ...pages.map((r) => ({
      path: `/page/` + r.path,
      label: r.name,
    })),
  ];

  return (
    <>
      <Seo />
      <Header setting={setting} menus={menus} />
      <ImagePlaceholder>
        <main className={style.main}>{children}</main>
      </ImagePlaceholder>
      <BackTop />
      {needFooter && <Footer setting={setting} />}
    </>
  );
};
