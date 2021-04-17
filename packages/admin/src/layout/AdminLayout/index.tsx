import React from 'react';
import { Layout, Breadcrumb, Menu, Icon } from 'antd';
import Link from 'next/link';
import cls from 'classnames';
import { useSetting } from '@/hooks/useSetting';
import Router, { useRouter } from 'next/router';
import { UserInfo } from '@/components/UserInfo';
import { nestMenus, findActiveMenu, findNestMenuChildren } from './menus';
import style from './index.module.scss';

const { Sider, Header, Content, Footer } = Layout;

export const AdminLayout: React.FC = ({ children }) => {
  const setting = useSetting();
  const router = useRouter();
  const { pathname } = router;
  const [activeMenu, breadcrumbs] = findActiveMenu(pathname);
  const submenus = findNestMenuChildren(pathname);

  return (
    <Layout className={style.container}>
      <Header className={style.header}>
        <div className={style.logo}>
          {setting.systemFavicon && <img src={setting.systemFavicon} />}
          <span style={{ marginLeft: 4 }}>管理后台</span>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeMenu && activeMenu.path]}
          style={{ lineHeight: '64px' }}
        >
          {nestMenus.map((menu) => {
            return (
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
          <Menu.Item>
            <UserInfo />
          </Menu.Item>
        </Menu>
      </Header>
      <Content className={style.main}>
        <Layout className={style.content}>
          {submenus.length ? (
            <Sider width={160} className={style.aside}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[activeMenu && activeMenu.path]}
              >
                {submenus.map((menu) => {
                  return (
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
          ) : null}
          <Layout style={{ paddingLeft: submenus.length ? 24 : 0 }}>
            <Breadcrumb className={style.breadcrumbs}>
              {breadcrumbs.map((breadcrumb) => {
                return (
                  <Breadcrumb.Item key={breadcrumb.path}>
                    <Link href={breadcrumb.path}>
                      <a>{breadcrumb.title}</a>
                    </Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </Content>
      <Footer className={style.footer}>
        <ul className={style.icons}>
          <li>
            <a
              className={style.github}
              href="https://github.com/fantasticit/wipi"
              target="_blank"
              rel="noreferrer"
            >
              <Icon type="github" />
            </a>
          </li>
        </ul>
        <div className={style.copyright}>
          <p>
            Copyright <Icon type="copyright" /> {new Date().getFullYear()} Designed by
            <a href="https://github.com/fantasticit/wipi" target="_blank" rel="noreferrer">
              {' '}
              Fantasticit.
            </a>
          </p>
        </div>
      </Footer>
    </Layout>
  );
};
