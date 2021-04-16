import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Modal, Divider, Badge, Popconfirm, Spin, Select, Button, Icon, message } from 'antd';
import { resolveUrl } from '@/utils';
import { AdminLayout } from '@/layout/AdminLayout';
import { PageProvider } from '@/providers/page';
import { ViewProvider } from '@/providers/view';
import { LocaleTime } from '@/components/LocaleTime';
import { ViewChart } from '@/components/ViewChart';
import style from './index.module.scss';
import { useSetting } from '@/hooks/useSetting';
import { DataTable } from '@/components/DataTable';

const columns = [
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '顺序',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: '阅读量',
    dataIndex: 'views',
    key: 'views',
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
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const isDraft = status === 'draft';
      return <Badge color={isDraft ? 'gold' : 'green'} text={isDraft ? '草稿' : '已发布'} />;
    },
  },
  {
    title: '发布时间',
    dataIndex: 'publishAt',
    key: 'publishAt',
    render: (date) => <LocaleTime date={date} />,
  },
];

interface IProps {
  pages: IPage[];
  total: number;
}

const Page: NextPage<IProps> = ({ pages: defaultPages = [], total: defaultTotal = 0 }) => {
  const router = useRouter();
  const setting = useSetting();
  const [pages, setPages] = useState<IPage[]>(defaultPages);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [views, setViews] = useState<IView[]>([]);
  const [params, setParams] = useState(null);

  const getViews = useCallback((url) => {
    setLoading(true);
    ViewProvider.getViewsByUrl(url).then((res) => {
      setViews(res);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  const getPages = useCallback((params = {}) => {
    return PageProvider.getPages(params).then((res) => {
      setParams(params);
      setPages(res[0]);
      return res;
    });
  }, []);

  const deleteArticle = useCallback(
    (id) => {
      PageProvider.deletePage(id).then(() => {
        message.success('页面删除成功');
        getPages(params);
      });
    },
    [params, getPages]
  );

  const editPage = useCallback(
    (id, data) => {
      PageProvider.updatePage(id, data).then(() => {
        message.success('操作成功');
        getPages(params);
      });
    },
    [params, getPages]
  );

  const titleColumn = {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <a href={(setting.systemUrl || '', `/page/${record.path}`)} target="_blank" rel="noreferrer">
        {text}
      </a>
    ),
  };

  const actionColumn = {
    title: '操作',
    key: 'action',
    render: (_, record) => {
      const isDraft = record.status === 'draft';

      return (
        <span className={style.action}>
          {isDraft ? (
            <a onClick={() => editPage(record.id, { status: 'publish' })}>启用</a>
          ) : (
            <a onClick={() => editPage(record.id, { status: 'draft' })}>禁用</a>
          )}
          <Divider type="vertical" />
          <Link href={`/page/editor/[id]`} as={`/page/editor/` + record.id}>
            <a target="_blank">编辑</a>
          </Link>
          <Divider type="vertical" />
          <span
            onClick={() => {
              setVisible(true);
              getViews(resolveUrl(setting.systemUrl, '/page/' + record.path));
            }}
          >
            <a>查看访问</a>
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除这个页面？"
            onConfirm={() => deleteArticle(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      );
    },
  };

  return (
    <AdminLayout>
      <div className={style.wrapper}>
        <DataTable
          data={pages}
          defaultTotal={defaultTotal}
          rightNode={
            <Link href={'/page/editor'}>
              <a target="_blank">
                <Button type="primary">
                  <Icon type="plus" />
                  新建
                </Button>
              </a>
            </Link>
          }
          columns={[titleColumn, ...columns, actionColumn]}
          searchFields={[
            {
              label: '名称',
              field: 'name',
              msg: '请输入页面名称',
            },
            {
              label: '路径',
              field: 'path',
              msg: '请输入页面路径',
            },
            {
              label: '状态',
              field: 'status',
              children: (
                <Select style={{ width: 180 }}>
                  {[
                    { label: '已发布', value: 'publish' },
                    { label: '草稿', value: 'draft' },
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
          onSearch={getPages}
        />
        <Modal
          title="访问统计"
          visible={visible}
          width={640}
          onCancel={() => {
            setVisible(false);
            setViews([]);
          }}
          maskClosable={false}
          footer={null}
        >
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin spinning={loading}></Spin>
            </div>
          ) : (
            <ViewChart data={views} />
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

Page.getInitialProps = async () => {
  const pages = await PageProvider.getPages({ page: 1, pageSize: 12 });
  return { pages: pages[0], total: pages[1] };
};

export default Page;
