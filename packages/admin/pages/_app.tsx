import React from 'react';
import App from 'next/app';
import { ViewProvider } from '@providers/view';
import { NProgress } from '@components/NProgress';
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
    const { Component, pageProps } = this.props;

    return (
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
    );
  }
}

export default MyApp;
