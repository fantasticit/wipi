import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { Badge, Popconfirm, message } from 'antd';
import { AdminLayout } from '@/layout/AdminLayout';
import { SearchProvider } from '@/providers/search';
import { LocaleTime } from '@/components/LocaleTime';
import { DataTable } from '@/components/DataTable';
import style from './index.module.scss';

const Search: NextPage = () => {
  const [data, setData] = useState<ISearch[]>([]);
  const [loading, setLoaidng] = useState(false);
  const [params, setParams] = useState(null);

  // 获取
  const getData = useCallback((params) => {
    if (loading) {
      return;
    }

    setLoaidng(true);
    return SearchProvider.getRecords(params)
      .then((res) => {
        setParams(params);
        setData(res[0]);
        setLoaidng(false);
        return res;
      })
      .catch(() => setLoaidng(false));
  }, []);

  // 删除
  const deleteItem = useCallback(
    (id) => {
      SearchProvider.deleteRecord(id).then(() => {
        message.success('搜索记录删除成功');
        getData(params);
      });
    },
    [params]
  );

  const columns = [
    {
      title: '搜索词',
      dataIndex: 'keyword',
      key: 'keyword',
    },
    {
      title: '搜索量',
      dataIndex: 'count',
      key: 'count',
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
      title: '搜索时间',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (date) => <LocaleTime date={date} />,
    },
  ];

  const actionColumn = {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <span className={style.action}>
        <Popconfirm
          title="确认删除这个搜索记录？"
          onConfirm={() => deleteItem(record.id)}
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
          data={data}
          defaultTotal={0}
          columns={[...columns, actionColumn]}
          searchFields={[
            {
              label: '类型',
              field: 'type',
              msg: '请输入搜索类型',
            },
            {
              label: '搜索词',
              field: 'keyword',
              msg: '请输入搜索词',
            },
            {
              label: '搜索量',
              field: 'count',
              msg: '请输入搜索量',
            },
          ]}
          onSearch={getData}
        />
      </div>
    </AdminLayout>
  );
};

export default Search;
