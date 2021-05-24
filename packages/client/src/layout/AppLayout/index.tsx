import React, { useContext } from 'react';
import { BackTop } from 'antd';
import { GlobalContext } from '@/context/global';
import { Seo } from '@/components/Seo';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import style from './index.module.scss';

interface Iprops {
  backgroundColor?: string;
  needFooter?: boolean;
}

export const AppLayout: React.FC<Iprops> = ({ children, needFooter = true }) => {
  const { setting, pages, categories, tags } = useContext(GlobalContext);

  return (
    <div className={style.wrapper}>
      <Seo />
      <Header setting={setting} categories={categories} tags={tags} pages={pages} />
      <main className={style.main}>{children}</main>
      <BackTop />
      {needFooter && <Footer setting={setting} />}
    </div>
  );
};
