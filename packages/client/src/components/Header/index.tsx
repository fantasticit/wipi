import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import cls from 'classnames';
import { Search } from '@/components/Search';
import { Theme } from '@/components/Theme';
import style from './index.module.scss';

export const _Header = ({ setting, categories, pages }) => {
  const router = useRouter();
  const asPath = router.asPath;
  const pathname = router.pathname;
  const [visible, setVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className={cls(style.header)}>
      <div className={cls(style.wrapper)}>
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
              <li>
                <Link href={'/'}>
                  <a>
                    <span>首页</span>
                  </a>
                </Link>
              </li>
              <Dropdown
                overlay={
                  <Menu key="category" style={{ minWidth: 240 }}>
                    {categories.map((category) => (
                      <Menu.Item
                        key={category.value}
                        onClick={() => Router.push('/' + category.value)}
                      >
                        <Link href="/[category]" as={`/` + category.value} shallow={false}>
                          <a>
                            <span>{category.label}</span>
                          </a>
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <li>
                  <a>
                    <span>分类</span>
                  </a>
                </li>
              </Dropdown>
              <li>
                <Link href={'/archives'}>
                  <a>
                    <span>归档</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'/knowledge'}>
                  <a>
                    <span>知识笔记</span>
                  </a>
                </Link>
              </li>
              {pages.map((menu) => (
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
                  <Link href={'/page/[id]'} as={`/page/${menu.path}`} scroll={false}>
                    <a>{menu.name}</a>
                  </Link>
                </li>
              ))}
              <li className={style.searchWrapper} onClick={() => setShowSearch(true)}>
                <a className={style.search}></a>
              </li>
              <li className={style.themeToggle}>
                <Theme />
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
