import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import { AdminLayout } from '@/layout/AdminLayout';
import { SettingProvider } from '@/providers/setting';
import { SystemSetting } from '@/components/Setting/SystemSetting';
import { SEOSetting } from '@/components/Setting/SEOSetting';
import { OSSSetting } from '@/components/Setting/OSSSetting';
import { SMTPSetting } from '@/components/Setting/SMTPSetting';

interface IProps {
  type: string;
}

const { TabPane } = Tabs;

const Setting: NextPage<IProps> = ({ type: defaultType }) => {
  const router = useRouter();
  const [type, setType] = useState(defaultType);
  const [setting, setSetting] = useState(null);

  useEffect(() => {
    SettingProvider.getSetting().then(res => {
      setSetting(res);
    });
  }, []);

  const tabs = [
    {
      label: '系统设置',
      content: <SystemSetting setting={setting} />,
    },
    {
      label: 'SEO 设置',
      content: <SEOSetting setting={setting} />,
    },
    {
      label: 'OSS 设置',
      content: <OSSSetting setting={setting} />,
    },
    {
      label: 'SMTP 服务',
      content: <SMTPSetting setting={setting} />,
    },
  ];

  return (
    <AdminLayout>
      {setting && (
        <Tabs
          activeKey={type}
          tabPosition={'left'}
          onChange={key => {
            setType(key);
            router.push(`/setting`, `/setting?type=` + key, {
              shallow: true,
            });
          }}
        >
          {tabs.map(tab => {
            return (
              <TabPane tab={tab.label} key={tab.label}>
                {tab.content}
              </TabPane>
            );
          })}
        </Tabs>
      )}
    </AdminLayout>
  );
};

Setting.getInitialProps = async ctx => {
  const { type } = ctx.query;
  return { type: '' + (type || '系统设置') };
};

export default Setting;
