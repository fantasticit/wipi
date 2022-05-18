import 'antd/dist/antd.less';
import 'highlight.js/styles/atom-one-light.css';
import 'viewerjs/dist/viewer.css';
import '@/theme/index.scss';

import { NProgress } from '@components/NProgress';
import { Seo } from '@components/Seo';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from 'next/app';
import React from 'react';

import { Analytics } from '@/components/Analytics';
import { FixAntdStyleTransition } from '@/components/FixAntdStyleTransition';
import { ViewStatistics } from '@/components/ViewStatistics';
import { GlobalContext, IGlobalContext } from '@/context/global';
import { SettingProvider } from '@/providers/setting';
import { UserProvider } from '@/providers/user';
import { toLogin } from '@/utils/login';

class MyApp extends App {
  state: Omit<IGlobalContext, 'setUser' | 'getSetting' | 'toggleCollapse'> = {
    setting: {},
    user: {},
    collapsed: false,
  };

  setUser = (user) => {
    if (!user) {
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ user });
  };

  getUserFromStorage = () => {
    const str = localStorage.getItem('user');
    if (str) {
      const user = JSON.parse(str);
      this.setUser(user);
      UserProvider.checkAdmin(user);
    } else {
      toLogin();
    }
  };

  getSetting = () => {
    SettingProvider.getSetting().then((res) => {
      this.setState({ setting: res });
    });
  };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount() {
    this.getSetting();
    this.getUserFromStorage();
  }

  render() {
    const { Component, pageProps } = this.props;
    const contextValue = {
      ...this.state,
      setUser: this.setUser,
      getSetting: this.getSetting,
      toggleCollapse: this.toggleCollapse,
    };

    return (
      <ConfigProvider locale={zhCN}>
        <GlobalContext.Provider value={contextValue}>
          <Seo />
          <FixAntdStyleTransition />
          <ViewStatistics />
          <Analytics />
          <NProgress color={'#0188fb'} />
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </ConfigProvider>
    );
  }
}

export default MyApp;
