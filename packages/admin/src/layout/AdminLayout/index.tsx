import React, { useContext } from 'react';
import { Layout, Breadcrumb, Row, Col, Menu, Icon } from 'antd';
import Link from 'next/link';
import cls from 'classnames';
import { useSetting } from '@/hooks/useSetting';
import Router, { useRouter } from 'next/router';
import { UserInfo } from '@/components/UserInfo';
import { GlobalContext } from '@/context/global';
import { ResourceCreate } from './ResourceCreate';
import { menus, findActiveMenu } from './menus';
import style from './index.module.scss';

const { Sider, Content } = Layout;

export const AdminLayout: React.FC = ({ children }) => {
  const { collapsed, toggleCollapse } = useContext(GlobalContext);
  const setting = useSetting();
  const router = useRouter();
  const { pathname } = router;
  const [activeMenu, breadcrumbs] = findActiveMenu(pathname);

  return (
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
  );
};
