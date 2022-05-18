import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Dropdown, Form, Input, Menu, Modal, Tooltip } from 'antd';
import Router from 'next/router';
import { useTranslations } from 'next-intl';
import React, { useCallback, useContext, useEffect } from 'react';

import { GlobalContext } from '@/context/global';
import { useToggle } from '@/hooks/useToggle';
import { UserProvider } from '@/providers/user';

import styles from './index.module.scss';

const emailRegexp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

export type IUser = {
  name: string;
  email: string;
};

export const isValidUser = (user: IUser): user is IUser => user && user.name && emailRegexp.test(user.email);

export const UserInfo: React.FC<{
  defaultVisible?: boolean;
  hidden?: boolean;
  onOk?: (arg: IUser) => void;
  onCancel?: () => void;
}> = ({ defaultVisible = false, hidden = false, onOk = () => {}, onCancel = () => {} }) => {
  const tRoot = useTranslations();
  const t = useTranslations('commentNamespace');
  const { user, setUser, removeUser } = useContext(GlobalContext);
  const [visible, toggleVisible] = useToggle(defaultVisible);

  const submit = useCallback(
    (values) => {
      UserProvider.login(values).then((res) => {
        setUser(res);
        onOk(res);
        toggleVisible(false);
      });
    },
    [toggleVisible, onOk, setUser]
  );

  const loginWithGithub = useCallback(() => {
    Router.replace(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${location.origin}/login?from=${location.href}`
    );
  }, []);

  const trigger = hidden ? (
    user && user.avatar ? (
      <Avatar size={28} src={user.avatar}></Avatar>
    ) : (
      <Avatar size={28} icon={<UserOutlined />}></Avatar>
    )
  ) : user ? (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>{user.name}</Menu.Item>
          <Menu.Item onClick={removeUser}>{t('logout')}</Menu.Item>
        </Menu>
      }
    >
      {user.avatar ? <Avatar size={28} src={user.avatar}></Avatar> : <Avatar size={28}>{user.name.charAt(0)}</Avatar>}
    </Dropdown>
  ) : (
    <Button onClick={toggleVisible} size="middle">
      {t('userInfoConfirm')}
    </Button>
  );

  useEffect(() => {
    toggleVisible(defaultVisible);
  }, [defaultVisible, toggleVisible]);

  return (
    <>
      {trigger}
      <Modal
        title={t('userInfoTitle')}
        okText={t('userInfoConfirm')}
        cancelText={t('userInfoCancel')}
        visible={visible}
        footer={null}
        onCancel={() => {
          toggleVisible();
          onCancel();
        }}
        transitionName={''}
        maskTransitionName={''}
        width="26.5em"
      >
        <Form name="user-info" onFinish={submit}>
          <Form.Item name="name" rules={[{ required: true, message: t('userInfoNameValidMsg') as string }]}>
            <Input placeholder={t('userInfoName') as string} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: t('userInfoPasswordValidMsg') as string }]}>
            <Input placeholder={t('userInfoPassword') as string} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {t('userInfoConfirm')}
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.other}>
          <div className={styles.icon} onClick={loginWithGithub}>
            <Tooltip title={tRoot('useGithubToLogin')}>
              <GithubOutlined />
            </Tooltip>
          </div>
          <Alert style={{ marginTop: 16 }} message={<p>{tRoot('loginTipMessage')}</p>} type="info" showIcon={true} />
        </div>
      </Modal>
    </>
  );
};
