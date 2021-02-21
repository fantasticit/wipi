import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { Badge, Divider, Select, message } from 'antd';
import * as dayjs from 'dayjs';
import { AdminLayout } from '@/layout/AdminLayout';
import { UserProvider } from '@/providers/user';
import { SPTDataTable } from '@/components/SPTDataTable';
import style from './index.module.scss';

const Page: NextPage = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [params, setParams] = useState(null);

  const getData = useCallback((params) => {
    return UserProvider.getUsers(params).then((res) => {
      setParams(params);
      setData(res[0]);
      return res;
    });
  }, []);

  const updateUser = useCallback(
    (user) => {
      UserProvider.update(user).then(() => {
        message.success('操作成功');
        getData(params);
      });
    },
    [params]
  );

  const columns = [
    {
      title: '账户',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'mail',
      width: '20%',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return role === 'admin' ? '管理员' : '访客';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const isLocked = status === 'locked';
        return <Badge color={isLocked ? 'gold' : 'green'} text={isLocked ? '已锁定' : '可用'} />;
      },
    },
    {
      title: '注册日期',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (date) => dayjs.default(date).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  const actionColumn = {
    title: '操作',
    key: 'action',
    render: (_, record) => {
      const isLocked = record.status === 'locked';
      const isAdmin = record.role === 'admin';

      return (
        <span className={style.action}>
          {isLocked ? (
            <a onClick={() => updateUser({ ...record, status: 'active' })}>启用</a>
          ) : (
            <a onClick={() => updateUser({ ...record, status: 'locked' })}>禁用</a>
          )}
          <Divider type="vertical" />
          {isAdmin ? (
            <a onClick={() => updateUser({ ...record, role: 'visitor' })}>解除授权</a>
          ) : (
            <a onClick={() => updateUser({ ...record, role: 'admin' })}>授权</a>
          )}
        </span>
      );
    },
  };

  return (
    <AdminLayout>
      <div className={style.wrapper}>
        <SPTDataTable
          data={data}
          defaultTotal={0}
          columns={[...columns, actionColumn]}
          searchFields={[
            {
              label: '账户',
              field: 'name',
              msg: '请输入用户账户',
            },
            {
              label: '邮箱',
              field: 'email',
              msg: '请输入账户邮箱',
            },
            {
              label: '状态',
              field: 'status',
              children: (
                <Select style={{ width: 180 }}>
                  {[
                    { label: '锁定', value: 'locked' },
                    { label: '可用', value: 'active' },
                  ].map((t) => {
                    return (
                      <Select.Option key={t.label} value={t.value}>
                        {t.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              ),
            },
          ]}
          onSearch={getData}
        />
      </div>
    </AdminLayout>
  );
};

export default Page;
