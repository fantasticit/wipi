import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import React from 'react';

import { useUser } from '@/hooks/useUser';

const menus = [
  {
    label: '个人中心',
    icon: 'user',
    path: '/ownspace',
  },
  {
    icon: 'user',
    label: '用户管理',
    path: '/user',
  },
  {
    icon: 'setting',
    label: '系统设置',
    path: '/setting',
  },
];

const menu = () => {
  return (
    <Menu>
      {menus.map((menu) => (
        <Menu.Item key={menu.label}>
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

export const UserInfo = () => {
  const user = useUser();

  return (
    <Dropdown overlay={menu}>
      <div>
        {user && user.avatar ? (
          <Avatar size={'small'} src={user.avatar} />
        ) : (
          <Avatar size={'small'} icon={<UserOutlined />} />
        )}
        {user ? <span style={{ marginLeft: 8 }}>Hi, {user.name}</span> : null}
      </div>
    </Dropdown>
  );
};
