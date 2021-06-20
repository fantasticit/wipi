import React from 'react';
import App from 'next/app';
import { default as Router } from 'next/router';
import { IntlMessages, NextIntlProvider } from 'next-intl';
import { safeJsonParse } from '@/utils/json';
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

  static getInitialProps = async ({ Component, ctx }) => {
    const getPagePropsPromise = Component.getInitialProps
      ? Component.getInitialProps(ctx)
      : Promise.resolve({});
    const [pageProps, setting, tags, categories, pages] = await Promise.all([
      getPagePropsPromise,
      SettingProvider.getSetting(),
      TagProvider.getTags({ articleStatus: 'publish' }),
      CategoryProvider.getCategory({ articleStatus: 'publish' }),
      PageProvider.getAllPublisedPages(),
    ]);
    const i18n = safeJsonParse(setting.i18n);
    return {
      pageProps,
      setting,
      tags,
      categories,
      pages: pages[0] || [],
      i18n,
      locales: Object.keys(i18n),
    };
  };

  changeLocale = (key) => {
    window.localStorage.setItem('locale', key);
    this.setState({ locale: key });
  };

  render() {
    const { Component, pageProps, i18n, locales, router, ...contextValue } = this.props;
    const locale = this.state.locale || router.locale;
    const { needLayoutFooter = true } = pageProps;
    const message = i18n[locale] || {};

    return (
      <GlobalContext.Provider
        value={{
          ...contextValue,
          i18n,
          locale,
          locales,
          changeLocale: this.changeLocale,
        }}
      >
        <NextIntlProvider messages={message as IntlMessages} locale={locale}>
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
