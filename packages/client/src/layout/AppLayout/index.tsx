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
  hasBg?: boolean;
}

export const AppLayout: React.FC<Iprops> = ({ children, needFooter = true, hasBg }) => {
  const { setting, pages, tags } = useContext(GlobalContext);
  const { systemBg } = setting;
  // const systemBg = '';

  return (
    <div className={style.wrapper}>
      <Seo />
      <Header setting={setting} tags={tags} pages={pages} hasBg={hasBg || !!systemBg} />
      <main
        className={style.main}
        style={{ backgroundColor: hasBg || !!systemBg ? 'transparent' : 'var(--bg-body)' }}
      >
        {children}
      </main>
      {systemBg && !hasBg && (
        <div className={style.bg}>
          <img src={systemBg} alt="背景" />
        </div>
      )}
      <BackTop />
      {needFooter && <Footer setting={setting} />}
    </div>
  );
};
