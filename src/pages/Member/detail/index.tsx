import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  return (
    <PageContainer
      ghost
      header={{
        title: '用户详情2',
      }}
    >
      <Button>只有 Admin dasd</Button>
    </PageContainer>
  );
};

export default AccessPage;
