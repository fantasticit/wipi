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
        status="500"
        title="500"
        subTitle="服务器顶不住了"
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
