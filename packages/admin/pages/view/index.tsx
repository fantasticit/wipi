import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { Badge, Popconfirm, message } from 'antd';
import { AdminLayout } from '@/layout/AdminLayout';
import { ViewProvider } from '@/providers/view';
import { LocaleTime } from '@/components/LocaleTime';
import { DataTable } from '@/components/DataTable';
import style from './index.module.scss';

const Views: NextPage = () => {
  const [views, setViews] = useState<IView[]>([]);
  const [loading, setLoaidng] = useState(false);
  const [params, setParams] = useState(null);

  const getViews = useCallback((params) => {
    if (loading) {
      return;
    }

    setLoaidng(true);
    return ViewProvider.getViews(params)
      .then((res) => {
        setParams(params);
        setViews(res[0]);
        setLoaidng(false);
        return res;
      })
      .catch(() => setLoaidng(false));
  }, []);

  // 删除
  const deleteView = useCallback(
    (id) => {
      ViewProvider.deleteView(id).then(() => {
        message.success('访问删除成功');
        getViews(params);
      });
    },
    [params]
  );

  const columns = [
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      fixed: 'left',
      render: (url) => (
        <a className={style.link} href={url} target="_blank">
          {url}
        </a>
      ),
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 160,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: '内核',
      dataIndex: 'engine',
      key: 'engine',
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      key: 'os',
    },
    {
      title: '设备',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (address) => {
        return address || '-';
      },
    },
    {
      title: '访问量',
      dataIndex: 'count',
      key: 'count',
      width: 120,
      render: (views) => (
        <Badge
          count={views}
          showZero={true}
          overflowCount={Infinity}
          style={{ backgroundColor: '#52c41a' }}
        />
      ),
    },
    {
      title: '访问时间',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 200,
      render: (date) => <LocaleTime date={date} />,
    },
  ];

  const actionColumn = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (_, record) => (
      <span className={style.action}>
        <Popconfirm
          title="确认删除这个访问？"
          onConfirm={() => deleteView(record.id)}
          okText="确认"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </span>
    ),
  };

  return (
    <AdminLayout>
      <div className={style.wrapper}>
        <DataTable
          scroll={{ x: 1440 }}
          data={views}
          defaultTotal={0}
          columns={[...columns, actionColumn]}
          searchFields={[
            {
              label: 'IP',
              field: 'ip',
              msg: '请输入 IP 地址',
            },
            {
              label: 'UA',
              field: 'userAgent',
              msg: '请输入 User Agent',
            },
            {
              label: 'URL',
              field: 'url',
              msg: '请输入 URL',
            },
            {
              label: '地址',
              field: 'address',
              msg: '请输入地址',
            },
            {
              label: '浏览器',
              field: 'browser',
              msg: '请输入浏览器',
            },
            {
              label: '内核',
              field: 'engine',
              msg: '请输入内核',
            },
            {
              label: 'OS',
              field: 'os',
              msg: '请输入操作系统',
            },
            {
              label: '设备',
              field: 'device',
              msg: '请输入设备',
            },
          ]}
          onSearch={(params) => {
            return getViews(params);
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default Views;
