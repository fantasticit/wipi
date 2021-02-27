import React from 'react';
import { Helmet } from 'react-helmet';
import { useSetting } from '@/hooks/useSetting';
import { useRouter } from 'next/router';
import { findActiveMenu } from '@/layout/AdminLayout/menus';

export const Seo: React.FC = () => {
  const setting = useSetting();
  const router = useRouter();
  const { pathname } = router;
  const [activeMenu] = findActiveMenu(pathname);

  return (
    <Helmet>
      <title>{(activeMenu && activeMenu.title) || '管理后台'}</title>
      <meta name="keyword" content={setting.seoKeyword} />
      <meta name="description" content={setting.seoDesc} />
      <link rel="shortcut icon" href={setting.systemFavicon} />
      <link
        href="//fonts.googleapis.com/css?family=Nunito:400,400i,700,700i&amp;display=swap"
        rel="stylesheet"
      ></link>
    </Helmet>
  );
};
