import React, { useContext, useEffect, useState } from 'react';
import { Layout, Breadcrumb, Row, Col, Menu, Icon, Dropdown, Button } from 'antd';
import Link from 'next/link';
import cls from 'classnames';
import { useSetting } from '@/hooks/useSetting';
import Router, { useRouter } from 'next/router';
import { UserInfo } from '@/components/UserInfo';
import { Helmet } from '@/components/Helmet';
import { GlobalContext } from '@/context/global';
import { menus } from './menus';
import style from './index.module.scss';

const { Sider, Content } = Layout;

const findActiveMenu = (pathname): [any, any[]] => {
  const idx = menus.findIndex((menu) => menu.path === pathname);
  if (idx < 0) {
    return [null, []];
  }
  const activeMenu = menus[idx];
  const breadcrumbs =
    idx > 1
      ? [
          menus.slice(0, 1)[0],
          ...menus.slice(1, idx).filter((menu) => {
            return activeMenu.path.includes(menu.path);
          }),
          activeMenu,
        ]
      : [menus.slice(0, 1)[0]];

  return [activeMenu, breadcrumbs];
};

const ResourceCreate = ({ collapsed = false }) => {
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
        {!collapsed && '新建'}
      </Button>
    </Dropdown>
  );
};

export const AdminLayout: React.FC = ({ children }) => {
  const { collapsed, toggleCollapse } = useContext(GlobalContext);
  const setting = useSetting();
  const router = useRouter();
  const { pathname } = router;
  const [activeMenu, breadcrumbs] = findActiveMenu(pathname);

  return (
    <>
      <Helmet></Helmet>
      <Layout className={style.container}>
        <Sider className={style.asider} trigger={null} collapsible={true} collapsed={collapsed}>
          <div className={style.logo}>
            {setting.systemFavicon && <img src={setting.systemFavicon} />}
            {!collapsed && <span style={{ marginLeft: 4 }}>管理后台</span>}
          </div>
          <div className={style.resourceCreate}>
            <ResourceCreate collapsed={collapsed} />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeMenu && activeMenu.path]}>
            {menus
              .filter((m: any) => !m.ignore)
              .map((menu) => {
                return menu.divider ? (
                  <div className={style.divider}></div>
                ) : (
                  <Menu.Item key={menu.path} onClick={() => Router.push(menu.path)}>
                    <Link href={menu.path}>
                      <a
                        className={cls({
                          [style.active]: activeMenu && activeMenu.path === menu.path,
                        })}
                      >
                        <Icon type={menu.icon} />
                        <span>{menu.label}</span>
                      </a>
                    </Link>
                  </Menu.Item>
                );
              })}
          </Menu>
        </Sider>
        <Layout className={style.main}>
          <header>
            <Row>
              <Col span={12}>
                <Icon
                  className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={toggleCollapse}
                />
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
          <Content className={style.content}>
            <header>
              <Breadcrumb>
                {breadcrumbs.map((breadcrumb) => {
                  return (
                    <Breadcrumb.Item>
                      <Link href={breadcrumb.path}>
                        <a>{breadcrumb.title}</a>
                      </Link>
                    </Breadcrumb.Item>
                  );
                })}
              </Breadcrumb>
              <div className={style.title}>{activeMenu && activeMenu.label}</div>
            </header>
            <main>
              {children}
              <footer>
                <ul className={style.icons}>
                  <li>
                    <a
                      className={style.github}
                      href="https://github.com/fantasticit/wipi"
                      target="_blank"
                    >
                      <Icon type="github" />
                    </a>
                  </li>
                </ul>
                <div className={style.copyright}>
                  <p>
                    Copyright <Icon type="copyright" /> {new Date().getFullYear()} Designed by
                    <a href="https://github.com/fantasticit/wipi" target="_blank">
                      {' '}
                      Fantasticit.
                    </a>
                  </p>
                </div>
              </footer>
            </main>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
