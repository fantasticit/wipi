import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { Alert, Button, Modal, Popconfirm, message } from 'antd';
import Link from 'next/link';
import { useSetting } from '@/hooks/useSetting';
import { AdminLayout } from '@/layout/AdminLayout';
import { MailProvider } from '@/providers/mail';
import { LocaleTime } from '@/components/LocaleTime';
import { DataTable } from '@/components/DataTable';
import style from './index.module.scss';

const Mail: NextPage = () => {
  const setting = useSetting();
  const [mails, setMails] = useState<IMail[]>([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [params, setParams] = useState(null);

  const isSmtpSettingFullfilled =
    setting &&
    setting.smtpHost &&
    setting.smtpPort &&
    setting.smtpUser &&
    setting.smtpFromUser &&
    setting.smtpFromUser;

  // 获取邮件
  const getMails = useCallback((params) => {
    return MailProvider.getMails(params).then((res) => {
      setParams(params);
      setMails(res[0]);
      return res;
    });
  }, []);

  // 删除邮件
  const deleteMail = useCallback(
    (id) => {
      MailProvider.deleteMail(id).then(() => {
        message.success('邮件删除成功');
        getMails(params);
      });
    },
    [params, getMails]
  );

  const columns = [
    {
      title: '发件人',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: '收件人',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: '主题',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: '内容',
      dataIndex: 'html',
      key: 'html',
      render: (_, record) => (
        <Button
          type="link"
          style={{ paddingLeft: 0 }}
          onClick={() => {
            setSelectedMail(record);
          }}
        >
          点击查看
        </Button>
      ),
    },
    {
      title: '发送时间',
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
          title="确认删除这个邮件？"
          onConfirm={() => deleteMail(record.id)}
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
        {!isSmtpSettingFullfilled ? (
          <div style={{ marginBottom: 24 }}>
            <Alert
              message={
                <span>
                  系统检测到<strong>SMTP 配置</strong>未完善，当收到评论时，无法进行邮件通知。
                  <Link href="/setting?type=SMTP%20服务">
                    <a>点我立即完善</a>
                  </Link>
                </span>
              }
              type="warning"
            />
          </div>
        ) : null}
        <DataTable
          data={mails}
          defaultTotal={0}
          columns={[...columns, actionColumn]}
          searchFields={[
            {
              label: '发件人',
              field: 'from',
              msg: '请输入发件人',
            },
            {
              label: '收件人',
              field: 'to',
              msg: '请输入收件人',
            },
            {
              label: '主题',
              field: 'subject',
              msg: '请输入主题',
            },
          ]}
          onSearch={getMails}
        />
        <Modal
          title={'发送内容'}
          visible={selectedMail}
          footer={null}
          width={786 + 48}
          onCancel={() => {
            setSelectedMail(null);
          }}
          transitionName={''}
          maskTransitionName={''}
        >
          <div
            className="markdown"
            style={{ overflow: 'auto !important' }}
            dangerouslySetInnerHTML={{
              __html: selectedMail && selectedMail.html,
            }}
          ></div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Mail;
