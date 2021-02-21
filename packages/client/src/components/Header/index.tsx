import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cls from 'classnames';
import { Search } from '@/components/Search';
import { ThemeToggle } from './ThemeToggle';
import style from './index.module.scss';

function throttle(fn, threshhold) {
  let last;
  let timer;
  threshhold || (threshhold = 250);

  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date();

    if (last && now < last + threshhold) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export const _Header = ({ setting, menus }) => {
  const router = useRouter();
  const asPath = router.asPath;
  const pathname = router.pathname;
  const [affix, setAffix] = useState(false);
  const [affixVisible, setAffixVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    let beforeY =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      window.scrollY ||
      document.body.scrollTop;

    const handler = throttle(() => {
      const y =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        window.scrollY ||
        document.body.scrollTop;

      setAffix(y > 0);
      setAffixVisible(beforeY > y);
      setTimeout(() => {
        beforeY = y;
      }, 0);
    }, 200);

    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, []);

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
              {menus.map((menu) => (
                <li
                  key={menu.label}
                  className={cls({
                    [style.active]:
                      pathname === menu.path ||
                      asPath === menu.path ||
                      (menu.dynamicPath && pathname === menu.dynamicPath),
                  })}
                  onClick={() => {
                    if (visible) {
                      setVisible(false);
                    }
                  }}
                >
                  {/page/.test(menu.path) ? (
                    <Link href={'/page/[id]'} as={menu.path} scroll={false}>
                      <a>{menu.label}</a>
                    </Link>
                  ) : (
                    <Link href={menu.path} scroll={false}>
                      <a>{menu.label}</a>
                    </Link>
                  )}
                </li>
              ))}
              <li className={style.searchWrapper} onClick={() => setShowSearch(true)}>
                <a className={style.search}></a>
              </li>
              <li className={style.themeToggle}>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
          <Search visible={showSearch} onClose={() => setShowSearch(false)} />
        </div>
      </div>
    </header>
  );
};

export const Header = React.memo(_Header);
