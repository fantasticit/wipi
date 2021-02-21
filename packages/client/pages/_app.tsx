import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { ViewProvider } from '@providers/view';
import { SettingProvider } from '@providers/setting';
import { PageProvider } from '@providers/page';
import { CategoryProvider } from '@providers/category';
import { TagProvider } from '@providers/tag';
import { Layout } from '@/layout/Layout';
import { NProgress } from '@components/NProgress';
import 'viewerjs/dist/viewer.css';
import 'highlight.js/styles/atom-one-light.css';
import '@/theme/antd.less';
import '@/theme/reset.scss';
import '@/theme/markdown.scss';

let lastUrl;

const addView = (url) => {
  if (/localhost/.test(url)) {
    return;
  }
  ViewProvider.addView({ url });
};

Router.events.on('routeChangeComplete', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
});

class MyApp extends App {
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

  componentDidMount() {
    try {
      const el = document.querySelector('#holderStyle');
      el.parentNode.removeChild(el);
    } catch (e) {}

    const url = window.location.href;
    lastUrl = url;
    addView(url);
  }

  componentDidUpdate() {
    const url = window.location.href;
    if (url === lastUrl) {
      return;
    }
    lastUrl = url;
    addView(url);
  }

  render() {
    const { Component, pageProps, setting = {}, tags = [], categories = [], pages = [] } = this
      .props as any;
    const { needLayoutFooter = true } = pageProps;

    return (
      <Layout setting={setting} pages={pages} needFooter={needLayoutFooter}>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: ` * {
      transition: none !important;
    }`,
          }}
        ></style>
        <NProgress color={'#ff0064'} />
        <Component
          {...pageProps}
          setting={setting}
          tags={tags}
          categories={categories}
          pages={pages}
        />
      </Layout>
    );
  }
}

export default MyApp;
