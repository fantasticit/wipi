import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import {
  Button,
  Select,
  Divider,
  Badge,
  Popconfirm,
  Modal,
  Input,
  message,
  notification,
} from 'antd';
import * as dayjs from 'dayjs';
import { AdminLayout } from '@/layout/AdminLayout';
import { CommentProvider } from '@/providers/comment';
import { SettingProvider } from '@/providers/setting';
import { SPTDataTable } from '@/components/SPTDataTable';
import { useSetting } from '@/hooks/useSetting';
import style from './index.module.scss';
const url = require('url');

interface IProps {
  comments: IComment[];
  total: number;
}

const Comment: NextPage<IProps> = ({
  comments: defaultComments = [],
  total = 0,
}) => {
  const setting = useSetting();
  const [comments, setComments] = useState<IComment[]>(defaultComments);
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyContent, setReplyContent] = useState(null);
  const [params, setParams] = useState(null);
  // 查看 html
  const [htmlVisible, setHTMLVisible] = useState(false);

  // 获取评论
  const getComments = useCallback((params = {}) => {
    return CommentProvider.getComments(params).then((res) => {
      setParams(params);
      setComments(res[0]);
      return res;
    });
  }, []);

  // 修改评论
  const updateComment = useCallback(
    (comment, pass = false) => {
      CommentProvider.updateComment(comment.id, { pass }).then(() => {
        message.success(pass ? '评论已通过' : '评论已拒绝');
        getComments(params);
      });
    },
    [params]
  );

  // 回复评论
  const replayComment = useCallback((comment) => {
    setSelectedComment(comment);
  }, []);

  const reply = useCallback(() => {
    if (!replyContent) {
      return;
    }

    const userInfo = JSON.parse(window.sessionStorage.getItem('user'));
    const email =
      (userInfo && userInfo.mail) || (setting && setting.smtpFromUser);

    const notify = () => {
      notification.error({
        message: '回复评论失败',
        description: '请前往系统设置完善 SMTP 设置，前往个人中心更新个人邮箱。',
      });
    };

    const handle = (email) => {
      const data = {
        name: userInfo.name,
        email,
        content: replyContent,
        parentCommentId: selectedComment.parentCommentId || selectedComment.id,
        hostId: selectedComment.hostId,
        isHostInPage: selectedComment.isHostInPage,
        replyUserName: selectedComment.name,
        replyUserEmail: selectedComment.email,
        createByAdmin: true,
      };

      CommentProvider.addComment(data)
        .then(() => {
          setSelectedComment(null);
          message.success('回复成功');
          setReplyContent('');
          getComments(params);
        })
        .catch((_) => notify());
    };

    if (!email) {
      SettingProvider.getSetting()
        .then((res) => {
          if (res && res.smtpFromUser) {
            handle(res.smtpFromUser);
          } else {
            notify();
          }
        })
        .catch(() => notify());
    } else {
      handle(email);
    }
  }, [selectedComment, replyContent, params]);

  // 删除评论
  const deleteComment = useCallback(
    (id) => {
      CommentProvider.deleteComment(id).then(() => {
        message.success('评论删除成功');
        getComments(params);
      });
    },
    [params]
  );

  const columns = [
    {
      title: '称呼',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系方式',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 160,
      render: (_, record) => (
        <Button
          type="link"
          style={{ paddingLeft: 0 }}
          onClick={() => {
            setSelectedComment(record);
            setHTMLVisible(true);
          }}
        >
          点击查看
        </Button>
      ),
    },
    {
      title: '父级评论',
      dataIndex: 'parentCommentId',
      key: 'parentCommentId',
      render: (id) => {
        const target = comments.find((c) => c.id === id);
        return (target && target.name) || '无';
      },
    },
    {
      title: '管理文章',
      dataIndex: 'hostId',
      key: 'hostId',
      render: (hostId, record) => {
        return hostId ? (
          <a
            href={url.resolve(
              setting.systemUrl || '',
              `/${record.isHostInPage ? 'page' : 'article'}/` + hostId
            )}
            className={style.link}
            target="_blank"
          >
            前往查看
          </a>
        ) : (
          '文章不存在，可能已经被删除'
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'pass',
      key: 'pass',
      render: (pass) => (
        <Badge
          color={!pass ? 'gold' : 'green'}
          text={!pass ? '未通过' : '通过'}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (date) => dayjs.default(date).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  const actionColumn = {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <span className={style.action}>
        <a onClick={() => updateComment(record, true)}>通过</a>
        <Divider type="vertical" />
        <a onClick={() => updateComment(record, false)}>拒绝</a>
        <Divider type="vertical" />
        <a onClick={() => replayComment(record)}>回复</a>
        <Divider type="vertical" />
        <Popconfirm
          title="确认删除这个评论？"
          onConfirm={() => deleteComment(record.id)}
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
        <SPTDataTable
          data={comments}
          defaultTotal={total}
          columns={[...columns, actionColumn]}
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
                      <Select.Option key={t.label} value={t.value as any}>
                        {t.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              ),
            },
          ]}
          onSearch={getComments}
        />
        <Modal
          title={'回复评论'}
          visible={selectedComment && !htmlVisible}
          cancelText={'取消'}
          okText={'回复'}
          onOk={reply}
          onCancel={() => setSelectedComment(null)}
        >
          <Input.TextArea
            rows={10}
            placeholder="支持 Markdown"
            value={replyContent}
            onChange={(e) => {
              let val = e.target.value;
              setReplyContent(val);
            }}
          ></Input.TextArea>
        </Modal>
        <Modal
          title={'评论详情'}
          visible={htmlVisible}
          footer={null}
          onCancel={() => {
            setSelectedComment(null);
            setHTMLVisible(false);
          }}
        >
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: selectedComment && selectedComment.content,
            }}
          ></div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

Comment.getInitialProps = async () => {
  const [comments] = await Promise.all([
    CommentProvider.getComments({ page: 1, pageSize: 12 }),
  ]);
  return { comments: comments[0], total: comments[1] };
};

export default Comment;
