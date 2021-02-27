import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { Select, Badge } from 'antd';
import * as dayjs from 'dayjs';
import { AdminLayout } from '@/layout/AdminLayout';
import { CommentProvider } from '@/providers/comment';
import { DataTable } from '@/components/DataTable';
import { useSetting } from '@/hooks/useSetting';
import { CommentArticle } from '@/components/comment/CommentArticle';
import { CommentAction } from '@/components/comment/CommentAction';
import { CommentContent } from '@/components/comment/CommentContent';
import { CommentHTML } from '@/components/comment/CommentHTML';
import { CommentStatus } from '@/components/comment/CommentStatus';

interface IProps {
  comments: IComment[];
  total: number;
}

const Comment: NextPage<IProps> = ({ comments: defaultComments = [], total = 0 }) => {
  const setting = useSetting();
  const [comments, setComments] = useState<IComment[]>(defaultComments);
  const [params, setParams] = useState(null);

  const getComments = useCallback(() => {
    return CommentProvider.getComments(params).then((res) => {
      setComments(res[0]);
      return res;
    });
  }, [params]);

  const columns = [
    {
      title: '称呼',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '联系方式',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '原始内容',
      dataIndex: 'content',
      key: 'content',
      width: 160,
      render: (_, record) => <CommentContent comment={record} />,
    },
    {
      title: 'HTML 内容',
      dataIndex: 'html',
      key: 'html',
      width: 160,
      render: (_, record) => <CommentHTML comment={record} />,
    },
    {
      title: '父级评论',
      dataIndex: 'parentCommentId',
      key: 'parentCommentId',
      width: 100,
      render: (id) => {
        const target = comments.find((c) => c.id === id);
        return (target && target.name) || '无';
      },
    },
    {
      title: '管理文章',
      dataIndex: 'hostId',
      key: 'hostId',
      width: 100,
      render: (_, record) => {
        return <CommentArticle comment={record} />;
      },
    },
    {
      title: '状态',
      dataIndex: 'pass',
      key: 'pass',
      width: 100,
      render: (_, record) => <CommentStatus comment={record} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 200,
      render: (date) => dayjs.default(date).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  const actionColumn = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (_, record) => <CommentAction comment={record} refresh={getComments} />,
  };

  return (
    <AdminLayout>
      <div>
        <DataTable
          data={comments}
          defaultTotal={total}
          columns={[...columns, actionColumn]}
          scroll={{ x: 1440 }}
          searchFields={[
            {
              label: '称呼',
              field: 'name',
              msg: '请输入称呼',
            },
            {
              label: 'Email',
              field: 'email',
              msg: '请输入联系方式',
            },
            {
              label: '状态',
              field: 'pass',
              children: (
                <Select style={{ width: 180 }}>
                  {[
                    { label: '已通过', value: 1 },
                    { label: '未通过', value: 0 },
                  ].map((t) => {
                    return (
                      <Select.Option key={t.label} value={t.value as number}>
                        {t.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              ),
            },
          ]}
          onSearch={(params) => {
            setParams(params);
            return getComments();
          }}
        />
      </div>
    </AdminLayout>
  );
};

Comment.getInitialProps = async () => {
  const [comments] = await Promise.all([CommentProvider.getComments({ page: 1, pageSize: 12 })]);
  return { comments: comments[0], total: comments[1] };
};

export default Comment;
