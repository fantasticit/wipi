import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { message } from 'antd';
import { SettingProvider } from '@/providers/setting';
import { NProgress } from '@components/NProgress';
import { IGlobalContext, GlobalContext } from '@/context/global';
import { FixAntdStyleTransition } from '@/components/FixAntdStyleTransition';
import { ViewStatistics } from '@/components/ViewStatistics';
import { Analytics } from '@/components/Analytics';
import 'highlight.js/styles/atom-one-light.css';
import 'viewerjs/dist/viewer.css';
import '@/theme/antd.less';
import '@/theme/reset.scss';
import '@/theme/markdown.scss';
import { UserProvider } from '@/providers/user';

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
      message.info('请重新登录');
      !Router.pathname.includes('login') && Router.push(`/login?redirect=${Router.asPath}`);
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
      <GlobalContext.Provider value={contextValue}>
        <FixAntdStyleTransition />
        <ViewStatistics />
        <Analytics />
        <NProgress color={'#0188fb'} />
        <Component {...pageProps} />
      </GlobalContext.Provider>
    );
  }
}

export default MyApp;
