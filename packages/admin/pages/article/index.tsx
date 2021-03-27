import React, { useState, useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Tag, Divider, Badge, Popconfirm, Modal, Spin, Select, Button, Icon, message } from 'antd';
import { AdminLayout } from '@/layout/AdminLayout';
import { ArticleProvider } from '@/providers/article';
import style from './index.module.scss';
import { useSetting } from '@/hooks/useSetting';
import { ViewProvider } from '@/providers/view';
import { CategoryProvider } from '@/providers/category';
import { TagProvider } from '@/providers/tag';
import { ViewChart } from '@/components/ViewChart';
import { DataTable } from '@/components/DataTable';
import { LocaleTime } from '@/components/LocaleTime';
const url = require('url');

const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    key: 'status',
    render: (status) => {
      const isDraft = status === 'draft';
      return <Badge color={isDraft ? 'gold' : 'green'} text={isDraft ? '草稿' : '已发布'} />;
    },
  },
  {
    title: '分类',
    key: 'category',
    dataIndex: 'category',
    width: 100,
    render: (category) =>
      category ? (
        <span>
          <Tag color={'magenta'} key={category.value}>
            {category.label}
          </Tag>
        </span>
      ) : null,
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.label.length > 2 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag.label}>
              {tag.label}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '阅读量',
    dataIndex: 'views',
    key: 'views',
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
    title: '喜欢数',
    dataIndex: 'likes',
    key: 'likes',
    width: 120,
    render: (val) => (
      <Badge
        count={val}
        showZero={true}
        overflowCount={Infinity}
        style={{ backgroundColor: '#eb2f96' }}
      />
    ),
  },
  {
    title: '发布时间',
    dataIndex: 'publishAt',
    key: 'publishAt',
    width: 200,
    render: (date) => <LocaleTime date={date} />,
  },
];

interface IArticleProps {
  articles: IArticle[];
  total: number;
}

const Article: NextPage<IArticleProps> = ({
  articles: defaultArticles = [],
  total: defaultTotal = 0,
}) => {
  const router = useRouter();
  const setting = useSetting();
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [views, setViews] = useState<IView[]>([]);
  const [params, setParams] = useState(null);
  const [categorys, setCategorys] = useState<Array<ICategory>>([]);
  const [tags, setTags] = useState<Array<ITag>>([]);

  useEffect(() => {
    CategoryProvider.getCategory().then((res) => setCategorys(res));
    TagProvider.getTags().then((tags) => setTags(tags));
  }, []);

  const getViews = useCallback((url) => {
    setLoading(true);
    ViewProvider.getViewsByUrl(url).then((res) => {
      setViews(res);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  const getArticles = useCallback((params = {}) => {
    return ArticleProvider.getArticles(params).then((res) => {
      setParams(params);
      setArticles(res[0]);
      return res;
    });
  }, []);

  const deleteArticle = useCallback(
    (id) => {
      ArticleProvider.deleteArticle(id).then(() => {
        message.success('文章删除成功');
        getArticles(params);
      });
    },
    [params]
  );

  const titleColumn = {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
    width: 200,
    render: (text, record) => (
      <a href={url.resolve(setting.systemUrl || '', `/article/${record.id}`)} target="_blank">
        {text}
      </a>
    ),
  };

  const actionColumn = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (_, record) => (
      <span className={style.action}>
        <Link href={`/article/editor/[id]`} as={`/article/editor/` + record.id}>
          <a target="_blank">编辑</a>
        </Link>
        <Divider type="vertical" />
        <span
          onClick={() => {
            setVisible(true);
            getViews(url.resolve(setting.systemUrl || '', '/article/' + record.id));
          }}
        >
          <a>查看访问</a>
        </span>
        <Divider type="vertical" />
        <Popconfirm
          title="确认删除这个文章？"
          onConfirm={() => deleteArticle(record.id)}
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
          rightNode={
            <Link href={'/article/editor'}>
              <a target="_blank">
                <Button type="primary">
                  <Icon type="plus" />
                  新建
                </Button>
              </a>
            </Link>
          }
          scroll={{ x: 1200 }}
          data={articles}
          defaultTotal={defaultTotal}
          columns={[titleColumn, ...columns, actionColumn]}
          searchFields={[
            {
              label: '标题',
              field: 'title',
              msg: '请输入文章标题',
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
            {
              label: '分类',
              field: 'category',
              children: (
                <Select style={{ width: 180 }}>
                  {categorys.map((t) => (
                    <Select.Option key={t.id} value={t.id}>
                      {t.label}
                    </Select.Option>
                  ))}
                </Select>
              ),
            },
          ]}
          onSearch={getArticles}
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

Article.getInitialProps = async () => {
  const articles = await ArticleProvider.getArticles({ page: 1, pageSize: 12 });
  return { articles: articles[0], total: articles[1] };
};

export default Article;
