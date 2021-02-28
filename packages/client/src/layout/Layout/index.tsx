import React, { useContext } from 'react';
import { BackTop } from 'antd';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '@/context/global';
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
      <Helmet>
        <title>{setting.systemTitle}</title>
        <meta name="keyword" content={setting.seoKeyword} />
        <meta name="description" content={setting.seoDesc} />
        <link rel="shortcut icon" href={setting.systemFavicon} />
        <link
          href="//fonts.googleapis.com/css?family=Nunito:400,400i,700,700i&amp;display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Header setting={setting} menus={menus} />
      <ImagePlaceholder>
        <main className={style.main}>{children}</main>
      </ImagePlaceholder>
      <BackTop />
      {needFooter && <Footer setting={setting} />}
    </>
  );
};
