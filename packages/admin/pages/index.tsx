import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Row, Col, Icon, Table, Badge, Tag, Alert } from 'antd';
import * as dayjs from 'dayjs';
import { useSetting } from '@/hooks/useSetting';
import { AdminLayout } from '@/layout/AdminLayout';
import { ArticleProvider } from '@providers/article';
import style from './index.module.scss';
const url = require('url');

interface IHomeProps {
  articles: IArticle[];
}

const columns = [
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const isDraft = status === 'draft';
      return (
        <Badge
          color={isDraft ? 'gold' : 'green'}
          text={isDraft ? '草稿' : '已发布'}
        />
      );
    },
  },
  {
    title: '分类',
    key: 'category',
    dataIndex: 'category',
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
    title: '发布时间',
    dataIndex: 'publishAt',
    key: 'publishAt',
    render: (date) => dayjs.default(date).format('YYYY-MM-DD HH:mm:ss'),
  },
];

const Home: NextPage<IHomeProps> = ({ articles = [] }) => {
  const setting = useSetting();

  const titleColumn = {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) =>
      setting.systemUrl ? (
        <a
          href={url.resolve(setting.systemUrl, `/article/${record.id}`)}
          target="_blank"
        >
          {text}
        </a>
      ) : (
        text
      ),
  };

  const actionColumn = {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <span className={style.action}>
        <Link href={`/article/editor/[id]`} as={`/article/editor/` + record.id}>
          <a target="_blank">编辑</a>
        </Link>
      </span>
    ),
  };

  return (
    <AdminLayout>
      <div className={style.recentArticle}>
        <div className={style.title}>
          <span>最新文章</span>
          <span>
            <Link href="/article">
              <a>
                <span>更多</span>
                <Icon type="right" />
              </a>
            </Link>
          </span>
        </div>
        <Row gutter={16}>
          {articles.slice(0, 4).map((article) => {
            return (
              <Col span={24 / 4} className={style.recentArticleItem}>
                <Link
                  href={`/article/editor/[id]`}
                  as={`/article/editor/` + article.id}
                >
                  <a target="_blank">
                    <img width={120} alt="文章封面" src={article.cover} />
                    <p className={style.title}>{article.title}</p>
                    <p className={style.desc}>{article.summary}</p>
                  </a>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>

      {!setting || !setting.systemUrl ? (
        <div style={{ marginTop: 24 }}>
          <Alert
            message={
              <span>
                系统检测到<strong>系统配置</strong>未完善，
                <Link href="/setting?type=系统设置">
                  <a>点我立即完善</a>
                </Link>
              </span>
            }
            type="warning"
          />
        </div>
      ) : null}

      <div className={style.articles}>
        <Table
          dataSource={articles}
          columns={[titleColumn, ...columns, actionColumn]}
          pagination={false}
        ></Table>
      </div>
    </AdminLayout>
  );
};

Home.getInitialProps = async () => {
  const [articles] = await Promise.all([
    ArticleProvider.getArticles({ page: 1, pageSize: 12 }),
  ]);

  return {
    articles: articles[0],
  };
};

export default Home;
