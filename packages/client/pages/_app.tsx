import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { NextIntlProvider } from 'next-intl';
import { IGlobalContext, GlobalContext } from '@/context/global';
import { SettingProvider } from '@/providers/setting';
import { PageProvider } from '@/providers/page';
import { CategoryProvider } from '@/providers/category';
import { TagProvider } from '@/providers/tag';
import { AppLayout } from '@/layout/AppLayout';
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

class MyApp extends App<IGlobalContext, unknown> {
  state = {
    locale: '',
  };

  static getInitialProps = async (ctx) => {
    const [appProps, setting, tags, categories, pages] = await Promise.all([
      App.getInitialProps(ctx),
      SettingProvider.getSetting(),
      TagProvider.getTags({ articleStatus: 'publish' }),
      CategoryProvider.getCategory({ articleStatus: 'publish' }),
      PageProvider.getAllPublisedPages(),
    ]);
    const i18n = (() => {
      try {
        return setting.i18n && typeof setting.i18n === 'object'
          ? setting.i18n
          : JSON.parse(setting.i18n as string);
      } catch (e) {
        return {};
      }
    })();
    return {
      ...appProps,
      setting,
      tags,
      categories,
      pages: pages[0] || [],
      i18n,
      locales: Object.keys(i18n),
    };
  };

  setI18n = async () => {
    const res = await SettingProvider.getSetting();
    const i18n = (() => {
      try {
        return res.i18n && typeof res.i18n === 'object' ? res.i18n : JSON.parse(res.i18n as string);
      } catch (e) {
        return {};
      }
    })();
    this.setState({ i18n, locale: Router.locale, locales: Object.keys(i18n) });
  };

  changeLocale = (key) => {
    this.setState({ locale: key });
  };

  render() {
    // @ts-ignore
    const { Component, pageProps, i18n, locales, router, ...contextValue } = this.props;
    const locale = this.state.locale || router.locale;
    const { needLayoutFooter = true } = pageProps;
    const message = i18n[locale] || {};

    return (
      <GlobalContext.Provider
        value={{
          ...contextValue,
          locale,
          locales,
          changeLocale: this.changeLocale,
        }}
      >
        <NextIntlProvider messages={message} locale={locale}>
          <FixAntdStyleTransition />
          <ViewStatistics />
          <Analytics />
          <AppLayout needFooter={needLayoutFooter}>
            <NProgress color={'#ff0064'} />
            <Component {...pageProps} />
          </AppLayout>
        </NextIntlProvider>
      </GlobalContext.Provider>
    );
  }
}

export default MyApp;
