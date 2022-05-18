import { Form } from '@ant-design/compatible';
import { Alert, Button, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { JsonEditor } from '@/components/JsonEditor';
import { SettingProvider } from '@/providers/setting';
import { safeJsonParse } from '@/utils/json';

export const OSSSetting = ({ setting }) => {
  const [oss, setOss] = useState({});

  useEffect(() => {
    setOss(safeJsonParse(setting.oss));
  }, [setting.oss]);

  const onChange = useCallback((value) => {
    setOss(value);
  }, []);

  const save = useCallback(() => {
    const data = {
      oss: JSON.stringify(oss),
    };
    SettingProvider.updateSetting(data).then(() => {
      message.success('保存成功');
    });
  }, [oss]);

  return (
    <Form layout="vertical">
      <Alert
        message="说明"
        description={`请在编辑器中输入您的 oss 配置，并添加 type 字段区分 \r\n {"type":"aliyun","accessKeyId":"","accessKeySecret":"","bucket":"","https":true,"region":""}`}
        type="info"
        showIcon={true}
        style={{ marginBottom: '1rem' }}
      />
      <JsonEditor
        value={oss}
        onChange={onChange}
        style={{
          height: '400px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          marginBottom: 24,
        }}
      />
      <Button type="primary" onClick={save}>
        保存
      </Button>
    </Form>
  );
};
