import React, { useState, useEffect } from 'react';
import { Form } from '@ant-design/compatible';
import { Input, Button, Switch, message } from 'antd';
import { FileSelectDrawer } from '@/components/FileSelectDrawer';
import { SettingProvider } from '@/providers/setting';

export const OSSSetting = ({ setting }) => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('logo');
  const [ossRegion, setOssRegion] = useState(null);
  const [ossAccessKeyId, setOssAccessKeyId] = useState(null);
  const [ossAccessKeySecret, setOssAccessKeySecret] = useState(null);
  const [ossBucket, setOssBucket] = useState(null);
  const [ossHttps, setOssHttps] = useState(false);

  useEffect(() => {
    setOssRegion((setting && setting.ossRegion) || null);
    setOssAccessKeyId((setting && setting.ossAccessKeyId) || null);
    setOssAccessKeySecret((setting && setting.ossAccessKeySecret) || null);
    setOssBucket((setting && setting.ossBucket) || null);
    setOssHttps((setting && setting.ossHttps) || false);
  }, [setting]);

  const save = () => {
    const data = {
      ossRegion,
      ossAccessKeyId,
      ossAccessKeySecret,
      ossBucket,
      ossHttps,
    };
    SettingProvider.updateSetting(data).then((res) => {
      message.success('保存成功');
    });
  };

  return (
    <div>
      <Form.Item label="Region">
        <Input
          placeholder="请输入正确的阿里 oss region"
          value={ossRegion}
          onChange={(e) => {
            setOssRegion(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="AccessKeyId">
        <Input
          placeholder="请输入正确的阿里 oss accessKeyId"
          value={ossAccessKeyId}
          onChange={(e) => {
            setOssAccessKeyId(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="AccessKeySecret">
        <Input
          placeholder="请输入正确的阿里 oss accessKeySecret"
          value={ossAccessKeySecret}
          onChange={(e) => {
            setOssAccessKeySecret(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Bucket">
        <Input
          placeholder="请输入正确的阿里 oss Bucket"
          value={ossBucket}
          onChange={(e) => {
            setOssBucket(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="HTTPS">
        <Switch checked={ossHttps} onChange={setOssHttps} />
      </Form.Item>
      <FileSelectDrawer
        visible={visible}
        closeAfterClick={true}
        onClose={() => setVisible(false)}
        onChange={(url) => {
          if (mode === 'logo') {
            setOssAccessKeyId(url);
          } else {
            setOssAccessKeySecret(url);
          }
        }}
      />
      <Button type="primary" onClick={save}>
        保存
      </Button>
    </div>
  );
};
