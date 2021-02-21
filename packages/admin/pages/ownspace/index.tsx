import React, { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import { Row, Col, List, Typography, Card, Avatar, Form, Input, Button, Tabs, message } from 'antd';
import Router from 'next/router';
import { AdminLayout } from '@/layout/AdminLayout';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { ArticleProvider } from '@providers/article';
import { CommentProvider } from '@providers/comment';
import { TagProvider } from '@/providers/tag';
import { CategoryProvider } from '@/providers/category';
import { FileProvider } from '@/providers/file';
import { UserProvider } from '@providers/user';

interface IOwnspaceProps {
  articlesCount: number;
  tagsCount: number;
  categoryCount: number;
  filesCount: number;
  commentsCount: number;
}

const { TabPane } = Tabs;

const Ownspace: NextPage<IOwnspaceProps> = ({
  articlesCount = 0,
  tagsCount = 0,
  categoryCount = 0,
  filesCount = 0,
  commentsCount = 0,
}) => {
  const data = [
    `累计发表了 ` + articlesCount + ' 篇文章',
    `累计创建了 ` + categoryCount + ' 个分类',
    `累计创建了 ` + tagsCount + ' 个标签',
    `累计上传了 ` + filesCount + ' 个文件',
    `累计获得了 ` + commentsCount + ' 个评论',
  ];
  const [visible, setVisible] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword1, setNewPassword1] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);

  useEffect(() => {
    let info = window.localStorage.getItem('user');
    try {
      info = JSON.parse(info);
      setUser(info as any);
    } catch (e) {}
  }, []);

  const save = useCallback(() => {
    UserProvider.update(user).then((res) => {
      setUser(res);
      window.localStorage.setItem('user', JSON.stringify(res));
      message.success('用户信息已保存');
    });
  }, [user]);

  const changePassword = () => {
    if (!oldPassword || !newPassword1 || !newPassword2) {
      return;
    }

    if (newPassword1 !== newPassword2) {
      message.error('两次密码不一致');
      return;
    }

    if (newPassword2.length <= 8) {
      message.error('密码长度过短');
      return;
    }

    const data = { ...user, oldPassword, newPassword: newPassword2 };
    UserProvider.updatePassword(data).then(() => {
      message.success('密码已更新，请重新登录');
      window.localStorage.clear();
      Router.replace('/admin/login');
    });
  };

  return (
    <AdminLayout>
      <Row gutter={16}>
        <Col span={12} md={12} xs={24}>
          <List
            style={{ backgroundColor: '#fff' }}
            header={
              user && (
                <div
                  style={{ textAlign: 'center' }}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  {user.avatar ? (
                    <Avatar size={64} src={user.avatar} />
                  ) : (
                    <Avatar size={64} icon="user" />
                  )}
                </div>
              )
            }
            bordered={true}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>{item}</Typography.Text>
              </List.Item>
            )}
          />
          <FileSelectDrawer
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            onChange={(url) => {
              setUser((user) => {
                user.avatar = url;
                return user;
              });
              setVisible(false);
            }}
          />
        </Col>
        {user && (
          <Col span={12} md={12} xs={24}>
            <Card title="个人资料" bordered={true}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="基本设置" key="1">
                  <Form.Item label="用户名">
                    <Input
                      placeholder="请输入用户名"
                      defaultValue={user.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setUser((user) => {
                          user.name = value;
                          return user;
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="邮箱">
                    <Input
                      placeholder="请输入邮箱"
                      defaultValue={user.email}
                      onChange={(e) => {
                        const value = e.target.value;
                        const regexp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

                        if (!regexp.test(value)) {
                          return;
                        }

                        setUser((user) => {
                          user.email = value;
                          return user;
                        });
                      }}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={save}>
                    保存
                  </Button>
                </TabPane>
                <TabPane tab="更新密码" key="2">
                  <Form.Item label="原密码">
                    <Input.Password
                      placeholder="请输入原密码"
                      value={oldPassword}
                      onChange={(e) => {
                        const value = e.target.value;
                        setOldPassword(value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="新密码">
                    <Input.Password
                      placeholder="请输入新密码"
                      value={newPassword1}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewPassword1(value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="确认密码">
                    <Input.Password
                      placeholder="请确认新密码"
                      value={newPassword2}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewPassword2(value);
                      }}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={changePassword}>
                    更新
                  </Button>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        )}
      </Row>
    </AdminLayout>
  );
};

Ownspace.getInitialProps = async () => {
  const [articles, tags, category, files, comments] = await Promise.all([
    ArticleProvider.getArticles({ page: 1, pageSize: 6 }),
    TagProvider.getTags(),
    CategoryProvider.getCategory(),
    FileProvider.getFiles({ page: 1, pageSize: 6 }),
    CommentProvider.getComments({ page: 1, pageSize: 6 }),
  ]);

  return {
    articlesCount: articles[1],
    tagsCount: tags.length,
    categoryCount: category.length,
    filesCount: files[1],
    commentsCount: comments[1],
  };
};

export default Ownspace;
