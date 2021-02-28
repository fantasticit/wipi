import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { IGlobalContext, GlobalContext } from '@/context/global';
import { SettingProvider } from '@/providers/setting';
import { PageProvider } from '@/providers/page';
import { CategoryProvider } from '@/providers/category';
import { TagProvider } from '@/providers/tag';
import { Layout } from '@/layout/Layout';
import { NProgress } from '@components/NProgress';
import { FixAntdStyleTransition } from '@/components/FixAntdStyleTransition';
import { ViewStatistics } from '@/components/ViewStatistics';
import { Analytics } from '@/components/Analytics';
import 'highlight.js/styles/atom-one-light.css';
import 'viewerjs/dist/viewer.css';
import '@/theme/antd.less';
import '@/theme/reset.scss';
import '@/theme/markdown.scss';

Router.events.on('routeChangeComplete', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
});

class MyApp extends App<IGlobalContext, {}> {
  static getInitialProps = async (ctx) => {
    const [appProps, setting, tags, categories, pages] = await Promise.all([
      App.getInitialProps(ctx),
      SettingProvider.getSetting(),
      TagProvider.getTags({ articleStatus: 'publish' }),
      CategoryProvider.getCategory({ articleStatus: 'publish' }),
      PageProvider.getAllPublisedPages(),
    ]);
    return { ...appProps, setting, tags, categories, pages: pages[0] || [] };
  };

  render() {
    const { Component, pageProps, ...contextValue } = this.props;
    const { needLayoutFooter = true } = pageProps;

    return (
      <GlobalContext.Provider value={contextValue}>
        <FixAntdStyleTransition />
        <ViewStatistics />
        <Analytics />
        <Layout needFooter={needLayoutFooter}>
          <NProgress color={'#ff0064'} />
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    );
  }
}

export default MyApp;
