import React from 'react';
import { BackTop, Switch } from 'antd';
import { Helmet } from 'react-helmet';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

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
  setting: any;
  pages: any;
}

export const Layout: React.FC<Iprops> = ({
  children,
  needFooter = true,
  setting = {},
  pages = [],
}) => {
  const menus = [
    ...defaultMenus,
    ...pages.map((r) => ({
      path: `/page/` + r.path,
      label: r.name,
    })),
  ];

  return (
    <div>
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
      <main>{children}</main>

      <div></div>

      <BackTop />
      {needFooter && <Footer setting={setting} />}
    </div>
  );
};
