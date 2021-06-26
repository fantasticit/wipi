import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import { AdminLayout } from '@/layout/AdminLayout';
import { useSetting } from '@/hooks/useSetting';
import { SystemSetting } from '@/components/Setting/SystemSetting';
import { SEOSetting } from '@/components/Setting/SEOSetting';
import { AnalyticsSetting } from '@/components/Setting/AnalyticsSetting';
import { OSSSetting } from '@/components/Setting/OSSSetting';
import { SMTPSetting } from '@/components/Setting/SMTPSetting';
import { LocaleSetting } from '@/components/Setting/LocaleSetting';

interface IProps {
  type: string;
}

const { TabPane } = Tabs;

const Setting: NextPage<IProps> = ({ type: defaultType }) => {
  const router = useRouter();
  const [type, setType] = useState(defaultType);
  const setting = useSetting();

  const tabs = [
    {
      label: '系统设置',
      content: <SystemSetting setting={setting} />,
    },
    {
      label: '国际化设置',
      content: <LocaleSetting setting={setting} />,
    },
    {
      label: 'SEO设置',
      content: <SEOSetting setting={setting} />,
    },
    {
      label: '数据统计',
      content: <AnalyticsSetting setting={setting} />,
    },
    {
      label: 'OSS设置',
      content: <OSSSetting setting={setting} />,
    },
    {
      label: 'SMTP服务',
      content: <SMTPSetting setting={setting} />,
    },
  ];

  return (
    <AdminLayout>
      {setting && (
        <div style={{ background: '#fff', padding: 16 }}>
          <Tabs
            activeKey={type}
            tabPosition={'left'}
            onChange={(key) => {
              setType(key);
              router.push(`/setting`, `/setting?type=` + key, {
                shallow: true,
              });
            }}
          >
            {tabs.map((tab) => {
              return (
                <TabPane tab={tab.label} key={tab.label}>
                  {tab.content}
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      )}
    </AdminLayout>
  );
};

Setting.getInitialProps = async (ctx) => {
  const { type } = ctx.query;
  return { type: '' + (type || '系统设置') };
};

export default Setting;
