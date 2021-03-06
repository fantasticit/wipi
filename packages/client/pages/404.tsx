import { Result, Button } from 'antd';
import Router from 'next/router';

const Page = () => {
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
        subTitle="页面去火星了"
        extra={
          <Button type="primary" onClick={() => Router.replace('/')}>
            回首页
          </Button>
        }
      />
    </div>
  );
};

export default Page;
