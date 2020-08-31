import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Dropdown, Avatar } from 'antd';

const menus = [
  {
    label: '个人中心',
    icon: 'user',
    path: '/ownspace',
  },
  // {
  //   icon: 'user',
  //   label: '用户管理',
  //   path: '/user',
  // },

  // {
  //   icon: 'setting',
  //   label: '系统设置',
  //   path: '/setting',
  // },
];

export const UserInfo = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    let info = window.sessionStorage.getItem('user');
    try {
      info = JSON.parse(info);
      setUser(info as any);
    } catch (e) {}

    if (!info) {
      Router.replace('/login');
    }
  }, []);

  const menu = () => {
    return (
      <Menu>
        {menus.map(menu => (
          <Menu.Item>
            <Link href={menu.path}>
              <a>{menu.label}</a>
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item>
          <Link href="/login">
            <a>退出登录</a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={menu}>
      <div>
        {user && user.avatar ? (
          <Avatar size={'small'} src={user.avatar} />
        ) : (
          <Avatar size={'small'} icon="user" />
        )}
        {user ? <span style={{ marginLeft: 8 }}>Hi, {user.name}</span> : null}
      </div>
    </Dropdown>
  );
};
