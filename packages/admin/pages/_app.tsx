import React from 'react';
import App from 'next/app';
import { ViewProvider } from '@providers/view';
import { SettingProvider } from '@providers/setting';
import { NProgress } from '@components/NProgress';
import { GlobalContext } from '@/context/global';
import 'viewerjs/dist/viewer.css';
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

class MyApp extends App {
  state = {
    setting: {},
    collapsed: false,
  };

  getSetting = () => {
    const flag = false;
    if (sessionStorage.getItem('setting')) {
      const str = sessionStorage.getItem('setting');
      try {
        this.setState({ setting: JSON.parse(str) });
      } catch (e) {}
    }
    if (flag) {
      return;
    }
    SettingProvider.getSetting().then((res) => {
      this.setState({ setting: res });
      sessionStorage.setItem('setting', JSON.stringify(res));
    });
  };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount() {
    this.getSetting();
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
    const { Component, pageProps } = this.props;

    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          toggleCollapse: this.toggleCollapse,
        }}
      >
        <div>
          <style
            id="holderStyle"
            dangerouslySetInnerHTML={{
              __html: ` * {
      transition: none !important;
    }`,
            }}
          ></style>
          <NProgress color={'#0188fb'} />
          <Component {...pageProps} />
        </div>
      </GlobalContext.Provider>
    );
  }
}

export default MyApp;
