import React from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { useTranslations } from 'next-intl';

const emailRegexp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

export type IUser = {
  name: string;
  email: string;
};

export const isValidUser = (user: IUser): user is IUser =>
  user && user.name && emailRegexp.test(user.email);

export interface UserInfoProps {
  visible: boolean;
  onOk?: (user: IUser) => void;
  onCancel?: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({ visible, onCancel, onOk }) => {
  const t = useTranslations('commentNamespace');

  const validateEmail = (_, value, callback) => {
    if (value && !emailRegexp.test(value)) {
      callback(t('userInfoEmailValidMsg'));
    } else {
      callback();
    }
  };

  const submit = (values) => {
    onOk(values);
  };

  return (
    <Modal
      title={t('userInfoTitle')}
      okText={t('userInfoConfirm')}
      cancelText={t('userInfoCancel')}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      transitionName={''}
      maskTransitionName={''}
    >
      <Form name="user-info" onFinish={submit}>
        <Form.Item
          label={t('userInfoName')}
          name="name"
          rules={[{ required: true, message: t('userInfoNameValidMsg') as string }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('userInfoEmail')}
          name="email"
          rules={[
            { required: true, message: t('userInfoEmailValidMsg') as string },
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onCancel} style={{ marginRight: 16 }}>
            {t('userInfoCancel')}
          </Button>
          <Button type="primary" htmlType="submit">
            {t('userInfoConfirm')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
