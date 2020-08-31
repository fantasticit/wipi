import React, { useState } from 'react';
import { Layout, Row, Col, Menu, Icon, Dropdown, Button } from 'antd';
import Link from 'next/link';
import cls from 'classnames';
import { Helmet } from 'react-helmet';
import { useSetting } from '@/hooks/useSetting';
import { useRouter } from 'next/router';
import { UserInfo } from '@/components/UserInfo';
import { menus } from './menus';
import style from './index.module.scss';

const findActiveMenu = pathname => {
  return menus.find(menu => menu.path === pathname);
};

const ResourceCreate = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link href={'/article/editor'}>
          <a target="_blank">
            <span>新建文章</span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href={'/page/editor'}>
          <a target="_blank">
            <span>新建页面</span>
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button style={{ width: '100%' }} type="primary" size="large" icon="plus">
        新建
      </Button>
    </Dropdown>
  );
};

export const AdminLayout: React.FC = ({ children }) => {
  const setting = useSetting();
  const router = useRouter();
  const { pathname } = router;
  const activeMenu = findActiveMenu(pathname);

  return (
    <Layout className={style.wrapper}>
      <Helmet>
        <title>{activeMenu.title || '管理后台'}</title>
        <meta name="keyword" content={setting.seoKeyword} />
        <meta name="description" content={setting.seoDesc} />
        <link rel="shortcut icon" href={setting.systemFavicon} />
        <link
          href="//fonts.googleapis.com/css?family=Nunito:400,400i,700,700i&amp;display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <div className={style.container}>
        <aside className={style.asider}>
          <div className={style.logo}>管理后台</div>
          <div className={style.resourceCreate}>
            <ResourceCreate />
          </div>
          <nav className={style.menus}>
            <ul>
              {menus
                .filter((m: any) => !m.ignore)
                .map(menu => {
                  return menu.divider ? (
                    <div className={style.divider}></div>
                  ) : (
                    <li key={menu.path}>
                      <Link href={menu.path}>
                        <a
                          className={cls({
                            [style.active]:
                              activeMenu && activeMenu.path === menu.path,
                          })}
                        >
                          <Icon type={menu.icon} />
                          <span>{menu.label}</span>
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </aside>
        <main className={style.main}>
          <header>
            <Row>
              <Col span={12}>
                <div className={style.title}>
                  {activeMenu && activeMenu.label}
                </div>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <div className={style.info}>
                  <a
                    className={style.github}
                    href="https://github.com/fantasticit/wipi"
                    target="_blank"
                  >
                    <Icon type="github" />
                    <span></span>
                  </a>
                  <UserInfo />
                </div>
              </Col>
            </Row>
          </header>
          <article>
            <div>{children}</div>
          </article>
        </main>
      </div>
    </Layout>
  );
};
