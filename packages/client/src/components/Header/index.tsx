import React, { useEffect } from 'react';
import cls from 'classnames';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { default as Router, useRouter } from 'next/router';
import { SearchOutlined } from '@ant-design/icons';
import { getDocumentScrollTop } from '@/utils';
import { useToggle } from '@/hooks/useToggle';
import { Search } from '@/components/Search';
import { Theme } from '@/components/Theme';
import { Locales } from '@/components/Locales';
import style from './index.module.scss';

const NAV_LINKS = [
  {
    path: '/',
    locale: 'article',
  },
  {
    path: '/archives',
    locale: 'archives',
  },
  {
    path: '/knowledge',
    locale: 'knowledgeBooks',
  },
];

export const Header = ({ setting, tags, pages }) => {
  const t = useTranslations();
  const router = useRouter();
  const { asPath } = router;
  const [affix, setAffix] = useToggle(false);
  const [affixVisible, setAffixVisible] = useToggle(false);
  const [visible, setVisible] = useToggle(false);
  const [showSearch, toggleSearch] = useToggle(false);

  useEffect(() => {
    const close = () => {
      if (visible) {
        setVisible(false);
      }
    };

    Router.events.on('routeChangeStart', close);

    return () => {
      Router.events.off('routeChangeStart', close);
    };
  }, [setVisible, visible]);

  useEffect(() => {
    let beforeY = 0;
    let y = 0;
    const handler = () => {
      y = getDocumentScrollTop();
      setAffix(y > 0);
      setAffixVisible(beforeY >= y);
      setTimeout(() => {
        beforeY = y;
      }, 0);
    };
    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, [setAffix, setAffixVisible]);

  const navMenu = NAV_LINKS.map((nav) => (
    <li key={nav.path} className={cls({ [style.active]: asPath === nav.path })}>
      <Link href={nav.path}>
        <a>
          <span>{t(nav.locale)}</span>
        </a>
      </Link>
    </li>
  ));

  const pageMenu = pages.map((menu) => (
    <li
      key={menu.label}
      className={cls({
        [style.active]: asPath.replace('/page/', '') === menu.path,
      })}
      onClick={() => {
        if (visible) {
          setVisible(false);
        }
      }}
    >
      <Link href={'/page/[id]'} as={`/page/${menu.path}`} scroll={false}>
        <a>{menu.name}</a>
      </Link>
    </li>
  ));

  return (
    <header className={cls(style.header)}>
      <div
        className={cls(
          style.wrapper,
          affix ? style.isFixed : false,
          affixVisible ? style.visible : false
        )}
      >
        <div className={cls('container')}>
          <div className={style.logo}>
            {/^http/.test(setting.systemLogo) ? (
              <Link href="/" scroll={false}>
                <a>
                  <img src={setting.systemLogo} alt="" />
                </a>
              </Link>
            ) : (
              <Link href="/" scroll={false}>
                <a dangerouslySetInnerHTML={{ __html: setting.systemLogo }}></a>
              </Link>
            )}
          </div>

          <div
            className={cls(style.mobileTrigger, visible ? style.active : false)}
            onClick={() => setVisible(!visible)}
          >
            <div className={style.stick}></div>
            <div className={style.stick}></div>
            <div className={style.stick}></div>
          </div>

          <nav className={cls(visible ? style.active : false)}>
            <ul>
              {navMenu}
              {pageMenu}
              <li className={style.toolWrapper}>
                <SearchOutlined style={{ cursor: 'pointer' }} onClick={toggleSearch} />
              </li>
              <li className={style.toolWrapper}>
                <Theme />
              </li>
              <li className={style.toolWrapper}>
                <Locales />
              </li>
            </ul>
            <Search tags={tags} visible={showSearch} onClose={toggleSearch} />
          </nav>
        </div>
      </div>
    </header>
  );
};
