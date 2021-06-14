import { Result, Button } from 'antd';
import Router from 'next/router';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle={t('pageMissing')}
        extra={
          <Button type="primary" onClick={() => Router.replace('/')}>
            {t('backHome')}
          </Button>
        }
      />
    </div>
  );
};

export default Page;
