import { PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { default as Router } from 'next/router';
import React from 'react';

export const ResourceCreate = ({ collapsed = false }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={() => Router.push('/article/editor')}>
        <Link href={'/article/editor'}>
          <a>
            <span>新建文章</span>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => Router.push('/page/editor')}>
        <Link href={'/page/editor'}>
          <a>
            <span>新建页面</span>
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button style={{ width: '100%' }} type="primary" size="large" icon={<PlusOutlined />}>
        {!collapsed && '新建'}
      </Button>
    </Dropdown>
  );
};
