import React from 'react';
import { Modal, Form, Button, Input } from 'antd';

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
  const validateEmail = (_, value, callback) => {
    if (value && !emailRegexp.test(value)) {
      callback('输入合法邮箱地址，以便在收到回复时邮件通知');
    } else {
      callback();
    }
  };

  const submit = (values) => {
    onOk(values);
  };

  return (
    <Modal
      title="请设置您的信息"
      visible={visible}
      cancelText={'取消'}
      okText={'设置'}
      footer={null}
      onCancel={onCancel}
    >
      <Form name="user-info" onFinish={submit}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入您的称呼!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '输入合法邮箱地址，以便在收到回复时邮件通知' },
            {
              validator: validateEmail,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onCancel} style={{ marginRight: 16 }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            设置
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
